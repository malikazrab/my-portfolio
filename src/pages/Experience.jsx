import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2, Award } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import { experience } from "../data/portfolio";

function ExperienceCard({ exp, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
      className="relative"
    >
      {/* Timeline line */}
      <div className="absolute left-6 top-14 bottom-0 w-px bg-gradient-to-b from-brand-400/50 to-transparent hidden sm:block" />

      <div className="flex gap-5 sm:gap-8">
        {/* Timeline dot */}
        <div className="hidden sm:flex flex-col items-center flex-shrink-0">
          <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center shadow-lg shadow-brand-500/30 relative z-10">
            <Briefcase size={18} className="text-white" />
          </div>
        </div>

        {/* Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="flex-1 glass-card rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300 mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
            <div>
              <h3 className="font-display font-extrabold text-xl dark:text-white mb-1">{exp.role}</h3>
              <p className="text-brand-500 dark:text-brand-400 font-display font-semibold text-base">{exp.company}</p>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-2">
              <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                <Calendar size={13} />
                <span className="font-mono">{exp.period}</span>
              </div>
              <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium ${
                exp.type === "Full-time"
                  ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800"
                  : "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
              }`}>
                {exp.type}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{exp.description}</p>

          {/* Highlights */}
          <div className="mb-6">
            <h4 className="font-display font-semibold text-sm dark:text-white mb-3">Key Achievements</h4>
            <ul className="space-y-2">
              {exp.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle2 size={14} className="text-brand-500 mt-0.5 flex-shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-1.5">
            {exp.tech.map((t) => (
              <span key={t} className="skill-pill">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <main className="page-section pt-28">
      <div className="container-tight">
        <SectionHeader
          tag="// career"
          title="Work Experience"
          subtitle="Over 6 years of professional software development — from freelancing to full-time engineering roles."
        />

        {/* Timeline */}
        <div className="mb-16">
          {experience.map((exp, i) => (
            <ExperienceCard key={exp.company + exp.role} exp={exp} index={i} />
          ))}
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-8 mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-500">
              <Award size={18} />
            </div>
            <h3 className="font-display font-bold text-xl dark:text-white">Milestones</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: "50+", label: "Projects delivered" },
              { value: "6+", label: "Years experience" },
              { value: "30+", label: "Happy clients" },
              { value: "3", label: "Platforms mastered" },
            ].map((m) => (
              <div key={m.label} className="text-center">
                <div className="font-display font-extrabold text-3xl text-gradient mb-1">{m.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{m.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Availability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl brand-gradient p-8 text-white text-center shadow-2xl shadow-brand-500/25"
        >
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white/20 text-sm font-mono">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Currently available
            </div>
            <h3 className="font-display font-extrabold text-2xl mb-3">Open to new opportunities</h3>
            <p className="text-white/80 text-sm max-w-md mx-auto">
              Whether it's a full-time role, long-term contract, or an exciting startup — I'd love to hear about it.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
