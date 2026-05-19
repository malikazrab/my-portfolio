import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "../components/SectionHeader";
import ScrollReveal from "../components/ScrollReveal";
import { skills } from "../data/portfolio";
import { easeOutExpo, viewportOnce } from "../utils/motion";

function SkillBar({ name, level, note, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <div>
          <span className="font-display font-semibold text-sm dark:text-white group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors">{name}</span>
          {note && <span className="ml-2 text-xs text-gray-400 dark:text-gray-600 font-mono">· {note}</span>}
        </div>
        <span className="text-xs font-mono text-brand-500 font-semibold">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-gray-100 dark:bg-dark-600 overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: delay + 0.2 }}
          className="h-full rounded-full brand-gradient relative origin-left"
          style={{ width: `${level}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white dark:bg-dark-900 border-2 border-brand-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const categories = Object.entries(skills);

  return (
    <main className="page-section pt-28">
      <div className="container-tight">
        <SectionHeader
          tag="// tech stack"
          title="Skills & Technologies"
          subtitle="My toolkit — built over 6+ years of professional development across backend systems, web frontends, and mobile apps."
        />

        {/* Skills grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {categories.map(([key, cat], catIdx) => (
            <ScrollReveal
              key={key}
              className="glass-card spotlight-card rounded-2xl p-6 lg:p-8"
              direction={catIdx % 2 === 0 ? "up" : "left"}
              delay={catIdx * 0.08}
              duration={0.6}
            >
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-100 dark:border-white/10">
                <div className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold border ${cat.color} ${cat.bg} ${cat.border}`}>
                  {cat.label}
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-600 font-mono">{cat.items.length} skills</span>
              </div>
              <div className="space-y-5">
                {cat.items.map((skill, i) => (
                  <SkillBar key={skill.name} {...skill} delay={catIdx * 0.1 + i * 0.05} />
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Tool icons grid */}
        <ScrollReveal className="glass-card spotlight-card rounded-2xl p-8 mb-16" direction="up">
          <h3 className="section-accent font-display font-bold text-xl dark:text-white mb-8 text-center after:left-1/2 after:-translate-x-1/2">Tools & Ecosystem</h3>
          <div className="flex flex-wrap justify-center gap-2.5">
            {[
              "Laravel", "PHP", "React", "Next.js", "React Native",
              "MySQL", "PostgreSQL", "Redis", "Docker", "Nginx",
              "Git", "GitHub", "Linux", "Stripe", "Tailwind CSS",
              "TypeScript", "Eloquent ORM", "Laravel Sanctum", "Livewire", "Inertia.js",
              "REST APIs", "GraphQL", "JWT", "WebSockets", "Laravel Echo",
              "PHPUnit", "Jest", "GitHub Actions", "Forge", "Vercel",
            ].map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.92, y: 8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                transition={{ delay: i * 0.018, duration: 0.35, ease: easeOutExpo }}
                className="skill-pill cursor-default"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </ScrollReveal>

        {/* Soft skills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { emoji: "🏗️", title: "System Design", desc: "Designing scalable architectures for real-world loads" },
            { emoji: "🐛", title: "Debugging", desc: "Methodical root-cause analysis and issue resolution" },
            { emoji: "🤝", title: "Team Collaboration", desc: "Clear communication and async-first workflows" },
            { emoji: "📈", title: "Growth Mindset", desc: "Always learning, always improving, always shipping" },
          ].map((s, i) => (
            <ScrollReveal
              key={s.title}
              className="glass-card spotlight-card rounded-xl p-5 text-center hover:-translate-y-1 transition-transform duration-200"
              direction="up"
              delay={i * 0.06}
              duration={0.5}
            >
              <div className="text-3xl mb-3">{s.emoji}</div>
              <h4 className="font-display font-bold text-sm dark:text-white mb-2">{s.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{s.desc}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </main>
  );
}
