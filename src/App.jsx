import React, { useState, useEffect, createContext, useContext, useMemo, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { shouldReduceMotion } from "./utils/performance";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import "./index.css";
import { easeOutExpo } from "./utils/motion";

gsap.registerPlugin(ScrollTrigger);

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Skills = lazy(() => import("./pages/Skills"));
const Experience = lazy(() => import("./pages/Experience"));
const Contact = lazy(() => import("./pages/Contact"));

export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: easeOutExpo },
  },
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
    // Kill all ScrollTrigger instances to prevent stacking animations
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const resetNativeScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    const resetLenisScroll = () => {
      try {
        if (window.__lenis && typeof window.__lenis.scrollTo === "function") {
          window.__lenis.scrollTo(0, { immediate: true });
          return true;
        }
      } catch (e) {
        // ignore
      }
      return false;
    };

    const resetScroll = () => {
      // Kill any GSAP tweens that may be animating window/document scroll
      try {
        gsap.killTweensOf(window);
        gsap.killTweensOf(document.documentElement);
        gsap.killTweensOf(document.body);
      } catch (e) {
        /* ignore */
      }

      resetNativeScroll();
      resetLenisScroll();
    };

    const ensureLenisReset = (attempt = 0) => {
      if (resetLenisScroll()) return;
      if (attempt < 4) {
        setTimeout(() => ensureLenisReset(attempt + 1), 30);
      }
    };

    // Run reset immediately and again on the next frame and shortly after to outrun other animations
    resetScroll();
    ensureLenisReset();

    let timeoutId;
    const frame = window.requestAnimationFrame(() => {
      resetScroll();
      ScrollTrigger.refresh();

      timeoutId = window.setTimeout(() => {
        resetScroll();
        ScrollTrigger.refresh();
      }, 20);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [location.pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  const reduceMotion = shouldReduceMotion();

  if (reduceMotion) {
    return (
      <div key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    );
  }

  return (
    <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="animate">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </motion.div>
  );
}

export default function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const themeValue = useMemo(() => ({ dark, setDark }), [dark]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <Router>
        <SmoothScroll>
          <ScrollToTop />
          <CustomCursor />
          <div className={`min-h-screen transition-colors duration-200 ease-out ${dark ? "bg-dark-900 text-gray-100" : "bg-white text-gray-900"}`}>
            <Navbar />
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-900" />}> 
            <AnimatedRoutes />
          </Suspense>
          <Footer />
          </div>
        </SmoothScroll>
      </Router>
    </ThemeContext.Provider>
  );
}
