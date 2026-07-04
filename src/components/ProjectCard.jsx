import React, { memo } from "react";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import InteractivePanel from "./InteractivePanel";
import ScrollReveal from "./ScrollReveal";

const tagColors = {
  Laravel: "tag-red",
  PHP: "tag-indigo",
  React: "tag-cyan",
  "Next.js": "tag-neutral",
  "React Native": "tag-blue",
  MySQL: "tag-orange",
  Redis: "tag-red",
  PostgreSQL: "tag-sky",
  Docker: "tag-blue",
  Stripe: "tag-purple",
};

function ProjectCard({ project, index }) {
  return (
    <ScrollReveal
      direction="up"
      delay={index * 70}
      duration={420}
    >
      <InteractivePanel
        className="group relative glass-card spotlight-card rounded-2xl overflow-hidden project-card motion-sheen h-full"
        innerClassName="relative z-10"
      >
        <div className="h-1.5 w-full brand-gradient" />

        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 bg-white/5 border border-white/10">
              {project.emoji}
            </div>
            <div className="flex items-center gap-2">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="icon-btn">
                  <Github size={15} />
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                  className="icon-btn">
                  <ExternalLink size={15} />
                </a>
              )}
            </div>
          </div>

          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">
              {project.title}
            </h3>
            <div className="text-brand-500 shrink-0">
              <ArrowUpRight size={16} />
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag) => (
              <span key={tag}
                className={`chip ${tagColors[tag] || "tag-neutral"}`}>
                {tag}
              </span>
            ))}
          </div>

          {project.stats && (
            <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10 mt-auto">
              {project.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-sm font-display font-bold text-brand-500 dark:text-brand-400">{stat.value}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </InteractivePanel>
    </ScrollReveal>
  );
}

export default memo(ProjectCard);
