import React, { createContext, lazy, Suspense, useContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./index.css";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Skills = lazy(() => import("./pages/Skills"));
const Experience = lazy(() => import("./pages/Experience"));
const Contact = lazy(() => import("./pages/Contact"));

export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const getInitialTheme = () => {
  if (typeof window === "undefined") return true;

  try {
    const saved = window.localStorage.getItem("theme");
    if (saved) return saved === "dark";
  } catch (error) {
    // fall through to system preference
  }

  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? true;
};

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return undefined;

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname]);

  return null;
}

function AppRoutes() {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default function App() {
  const [dark, setDark] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document.documentElement.style.colorScheme = dark ? "dark" : "light";

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", dark ? "#020617" : "#f8fafc");
    }

    try {
      window.localStorage.setItem("theme", dark ? "dark" : "light");
    } catch (error) {
      // ignore storage failures
    }
  }, [dark]);

  const themeValue = useMemo(() => ({ dark, setDark }), [dark]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <Router>
        <ScrollToTop />
        <div className={`relative z-10 min-h-screen transition-colors duration-200 ease-out ${dark ? "text-slate-100" : "text-slate-900"}`}>
          <Navbar />
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center" />}>
            <AppRoutes />
          </Suspense>
          <Footer />
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}
