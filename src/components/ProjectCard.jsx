import React, { memo } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { cardHover, easeOutExpo, viewportOnce } from "../utils/motion";
import InteractivePanel from "./InteractivePanel";

function ProjectCard({ project, index }) {
  const tagColors = {
    Laravel: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800",
    PHP: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
    React: "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800",
    "Next.js": "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600",
    "React Native": "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    MySQL: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800",
    Redis: "bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 border-red-200 dark:border-red-800",
    PostgreSQL: "bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800",
    Docker: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    Stripe: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, delay: index * 0.08, ease: easeOutExpo }}
    >
      <InteractivePanel
        variants={cardHover}
        initial="rest"
        whileHover="hover"
        className="group relative glass-card spotlight-card rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-brand-500/15 transition-[transform,box-shadow,background-color,border-color] duration-300"
        innerClassName="relative z-10"
      >
        {/* Header gradient bar */}
        <div className={`h-1.5 w-full brand-gradient`} />

        {/* Gradient overlay on hover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: easeOutExpo }}
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 0%, rgba(20,184,166,0.05) 0%, transparent 70%)" }}
        />

        <motion.div
          initial={{ x: "-120%", opacity: 0 }}
          whileHover={{ x: "120%", opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-y-0 left-0 w-24 pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.24), transparent)", transform: "skewX(-18deg)" }}
        />

        <div className="p-6">
          {/* Top row */}
          <div className="flex items-start justify-between mb-4">
            <motion.div
              whileHover={{ rotate: 6, scale: 1.06 }}
              transition={{ duration: 0.25 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: "rgba(20,184,166,0.1)" }}>
              {project.emoji}
            </motion.div>
            <div className="flex items-center gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-[opacity,transform] duration-200">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-[color,background-color] duration-150">
                  <Github size={15} />
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-[color,background-color] duration-150">
                  <ExternalLink size={15} />
                </a>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display font-bold text-lg dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              {project.title}
            </h3>
            <div className="text-brand-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-[opacity,transform] duration-200">
              <ArrowUpRight size={16} />
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5 line-clamp-3">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag) => (
              <span key={tag}
                className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium border ${tagColors[tag] || "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700"}`}>
                {tag}
              </span>
            ))}
          </div>

          {/* Stats row */}
          {project.stats && (
            <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-white/10">
              {project.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-sm font-display font-bold text-brand-500 dark:text-brand-400">{stat.value}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </InteractivePanel>
    </motion.div>
  );
}

export default memo(ProjectCard);
