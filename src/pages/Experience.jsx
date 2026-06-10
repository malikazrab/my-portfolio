import React from "react";
import { Award, Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import ScrollReveal from "../components/ScrollReveal";
import InteractivePanel from "../components/InteractivePanel";
import { experience } from "../data/portfolio";

function ExperienceCard({ entry }) {
  return (
    <div className="relative mb-10 last:mb-0">
      <div className="flex gap-5 sm:gap-8">
        <div className="hidden sm:flex flex-col items-center flex-shrink-0">
          <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Briefcase size={18} className="text-white" />
          </div>
        </div>

        <InteractivePanel className="flex-1 glass-card rounded-2xl p-6 sm:p-8 h-full" innerClassName="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
            <div>
              <h3 className="font-display font-semibold text-xl text-slate-900 dark:text-white mb-1">{entry.role}</h3>
              <p className="text-cyan-300 font-display font-semibold text-base">{entry.company}</p>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-2">
              <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <Calendar size={13} />
                <span className="font-mono">{entry.period}</span>
              </div>
              <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium border ${
                entry.type === "Full-time"
                  ? "bg-green-50/10 text-green-300 border-green-400/20"
                  : "bg-blue-50/10 text-blue-300 border-blue-400/20"
              }`}>
                {entry.type}
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{entry.description}</p>

          <div className="mb-6">
            <h4 className="section-accent font-display font-semibold text-sm text-slate-900 dark:text-white mb-5">Key Achievements</h4>
            <ul className="space-y-2">
              {entry.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                  <CheckCircle2 size={14} className="text-cyan-300 mt-0.5 shrink-0" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {entry.tech.map((tech) => (
              <span key={tech} className="skill-pill">{tech}</span>
            ))}
          </div>
        </InteractivePanel>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <main className="page-shell page-section pt-28">
      <div className="container-tight">
        <SectionHeader
          tag="// career"
          title="Work Experience"
          subtitle="Professional software development across freelancing and full-time engineering roles."
        />

        <div className="relative mb-16">
          <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-white/10 hidden sm:block pointer-events-none" />
          {experience.map((entry) => (
            <ExperienceCard key={`${entry.company}-${entry.role}`} entry={entry} />
          ))}
        </div>

        <ScrollReveal direction="up" className="glass-card spotlight-card rounded-2xl p-8 mb-12 h-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-cyan-300">
              <Award size={18} />
            </div>
            <h3 className="font-display font-semibold text-xl text-slate-900 dark:text-white">Milestones</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: "10+", label: "Projects delivered" },
              { value: "2+", label: "Years experience" },
              { value: "5+", label: "Happy clients" },
              { value: "3", label: "Platforms mastered" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="font-display font-semibold text-3xl text-gradient mb-1">{item.value}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{item.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" className="relative overflow-hidden rounded-2xl brand-gradient p-8 text-white text-center shadow-2xl shadow-cyan-500/20">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white/15 text-sm font-mono">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Currently available
            </div>
            <h3 className="font-display font-semibold text-2xl mb-3">Open to new opportunities</h3>
            <p className="text-white/80 text-sm max-w-md mx-auto">
              Whether it’s a full-time role, long-term contract, or startup project, I’m open to the right fit.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
