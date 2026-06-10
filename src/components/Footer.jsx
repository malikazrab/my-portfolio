import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Github, Mail, Phone, Heart } from "lucide-react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg brand-gradient flex items-center justify-center float-fast overflow-hidden border border-white/10">
                <span className="font-display text-[10px] font-bold text-white tracking-tight translate-y-[1px]">
                  &lt;/&gt;
                </span>
              </div>
              <span className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Hafiz<span className="text-cyan-300">.</span>
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xs">
              Full Stack Developer crafting robust backends and seamless user experiences.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm text-slate-900 dark:text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              {["Home", "About", "Projects", "Skills", "Experience", "Contact"].map((page) => (
                <li key={page}>
                  <Link
                    to={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                    className="text-sm text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-200 transition-colors motion-sheen"
                  >
                    {page}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm text-slate-900 dark:text-white mb-4">Get in Touch</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:malikazrab2007@gmail.com" className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-200 transition-colors motion-sheen">
                  <Mail size={13} />
                  malikazrab2007@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+923242349720" className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-200 transition-colors motion-sheen">
                  <Phone size={13} />
                  +92 (324) 2349720
                </a>
              </li>
              <li>
                <a href="https://github.com/malikazrab" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-200 transition-colors motion-sheen">
                  <Github size={13} />
                  github.com/malikazrab
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            © {year} Hafiz Azrab. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            Built with <Heart size={10} className="text-cyan-300" /> React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
