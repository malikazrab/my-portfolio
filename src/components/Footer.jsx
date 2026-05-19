import React, { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Mail, Phone, Terminal, Heart } from "lucide-react";
import { revealSoft, staggerContainer, viewportOnce } from "../utils/motion";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer(0.03, 0.08)}
      className="border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-dark-800/50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <motion.div variants={revealSoft}>
            <motion.div
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="flex items-center gap-2 mb-3"
            >
              <motion.div
                whileHover={{ rotate: -5, scale: 1.04 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="w-7 h-7 rounded-lg brand-gradient flex items-center justify-center"
              >
                <Terminal size={13} className="text-white" />
              </motion.div>
              <span className="font-display font-bold text-lg dark:text-white">
                Hafiz<span className="text-brand-500">.</span>
              </span>
            </motion.div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
              Full Stack Developer crafting robust backends and seamless user experiences.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div variants={revealSoft}>
            <h4 className="font-display font-semibold text-sm text-gray-900 dark:text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              {["Home", "About", "Projects", "Skills", "Experience", "Contact"].map((page) => (
                <li key={page}>
                  <motion.div whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
                    <Link
                    to={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                  >
                    {page}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={revealSoft}>
            <h4 className="font-display font-semibold text-sm text-gray-900 dark:text-white mb-4">Get in Touch</h4>
            <ul className="space-y-2.5">
              <li>
                <motion.a whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 260, damping: 22 }} href="mailto:malikazrab2007@gmail.com" className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                  <Mail size={13} />
                  malikazrab2007@gmail.com
                </motion.a>
              </li>
              <li>
                <motion.a whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 260, damping: 22 }} href="tel:+923242349720" className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                  <Phone size={13} />
                  +92 (324) 2349720
                </motion.a>
              </li>
              <li>
                <motion.a whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 260, damping: 22 }} href="https://github.com/malikazrab" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                  <Github size={13} />
                  github.com/malikazrab
                </motion.a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div variants={revealSoft} className="pt-6 border-t border-gray-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400 dark:text-gray-600 font-mono">
            © {year} Hafiz Azrab. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-600 flex items-center gap-1">
            Built with <Heart size={10} className="text-brand-500" /> React & Tailwind
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default memo(Footer);
