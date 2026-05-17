import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project, index }) {
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
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative glass-card rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Header gradient bar */}
      <div className={`h-1.5 w-full brand-gradient`} />

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(20,184,166,0.05) 0%, transparent 70%)" }}
      />

      <div className="p-6">
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: "rgba(20,184,166,0.1)" }}>
            {project.emoji}
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all duration-150">
                <Github size={15} />
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all duration-150">
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        <h3 className="font-display font-bold text-lg dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          {project.title}
        </h3>
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
    </motion.div>
  );
}
