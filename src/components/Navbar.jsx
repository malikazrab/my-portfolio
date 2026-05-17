import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, Code2, Terminal } from "lucide-react";
import { useTheme } from "../App";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
  { to: "/experience", label: "Experience" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { dark, setDark } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    const handler = (e) => {
      if (open && menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass shadow-lg shadow-black/5" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg brand-gradient flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:scale-110 transition-transform duration-200">
                <Terminal size={15} className="text-white" />
              </div>
              <span className="font-display font-bold text-base sm:text-lg tracking-tight dark:text-white">
                Hafiz<span className="text-brand-500">.</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-4 py-2 rounded-lg text-sm font-display font-medium transition-all duration-200 ${
                    isActive(link.to)
                      ? "text-brand-500 dark:text-brand-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive(link.to) && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-brand-50 dark:bg-brand-900/20 -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDark(!dark)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 hover:bg-gray-100 dark:hover:bg-dark-600 transition-all duration-200 active:scale-90"
                aria-label="Toggle dark mode"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={dark ? "moon" : "sun"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {dark ? <Sun size={16} /> : <Moon size={16} />}
                  </motion.div>
                </AnimatePresence>
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setOpen(!open)}
                className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-600 transition-all duration-200 active:scale-90"
                aria-label="Toggle menu"
                aria-expanded={open}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={open ? "x" : "menu"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {open ? <X size={20} /> : <Menu size={20} />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              ref={menuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 glass shadow-2xl md:hidden"
            >
              <div className="flex flex-col h-full pt-20 pb-8 px-6">
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.3 }}
                    >
                      <Link
                        to={link.to}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-display font-medium text-base transition-all duration-200 active:scale-95 ${
                          isActive(link.to)
                            ? "text-brand-500 bg-brand-50 dark:bg-brand-900/20"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-600"
                        }`}
                      >
                        {isActive(link.to) && (
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                        )}
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-gray-200 dark:border-white/10">
                  <p className="text-xs font-mono text-gray-400 dark:text-gray-600 text-center">
                    malikazrab2007@gmail.com
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
