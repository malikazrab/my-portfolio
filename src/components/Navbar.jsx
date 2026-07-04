import React, { memo, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "../App";
import { personal } from "../data/portfolio";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
  { to: "/experience", label: "Experience" },
  { to: "/contact", label: "Contact" },
];

function Navbar() {
  const { dark, setDark } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [routePulse, setRoutePulse] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    setRoutePulse(true);
    const timer = window.setTimeout(() => setRoutePulse(false), 360);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);

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
    const onScroll = () => {
      const nextScrolled = window.scrollY > 20;
      setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
    };

    onScroll();
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
      <header className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-200 ${scrolled ? "nav-shell shadow-2xl shadow-black/20" : "bg-transparent"} ${routePulse ? "nav-route-switch" : ""}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[4.5rem]">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl brand-gradient flex items-center justify-center shadow-lg shadow-cyan-500/20 pulse-soft overflow-hidden border border-white/10">
                <span className="absolute left-2 top-2 flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                </span>
                <span className="font-display text-[13px] font-bold text-white tracking-tight translate-y-[1px]">
                  &lt;/&gt;
                </span>
              </div>
              <span className="font-display font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
                {personal.name}<span className="text-brand-500">.</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-link ${isActive(link.to) ? "nav-link-active" : ""}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setDark(!dark)}
                className="icon-btn motion-sheen"
                aria-label="Toggle theme"
                type="button"
              >
                {dark ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              <button
                onClick={() => setOpen(!open)}
                className="icon-btn md:hidden motion-sheen"
                aria-label="Toggle menu"
                aria-expanded={open}
                type="button"
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {open && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        ref={menuRef}
        className={`fixed right-0 top-0 bottom-0 z-50 w-[min(16rem,75vw)] nav-shell md:hidden transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col pt-20 pb-8 px-6">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`nav-drawer-link ${isActive(link.to) ? "nav-drawer-link-active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/10">
            <p className="text-xs font-mono text-slate-500 text-center">
              {personal.email}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default memo(Navbar);
