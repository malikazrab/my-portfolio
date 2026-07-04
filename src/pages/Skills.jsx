import React from "react";
import SectionHeader from "../components/SectionHeader";
import ScrollReveal from "../components/ScrollReveal";
import { skills } from "../data/portfolio";

function SkillBar({ name, level, note }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5 gap-3">
        <div>
          <span className="font-display font-semibold text-sm text-slate-900 dark:text-white">{name}</span>
          {note && <span className="ml-2 text-xs text-slate-500 dark:text-slate-400 font-mono">· {note}</span>}
        </div>
        <span className="text-xs font-mono text-cyan-300 font-semibold">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <div className="h-full rounded-full brand-gradient bar-fill" style={{ width: `${level}%` }} />
      </div>
    </div>
  );
}

export default function Skills() {
  const categories = Object.entries(skills);

  return (
    <main className="page-shell page-section pt-28">
      <div className="container-tight">
        <SectionHeader
          tag="// tech stack"
          title="Skills & Technologies"
          subtitle="My toolkit, shaped by frontend fundamentals, Laravel backend work, database design, and practical project delivery."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {categories.map(([key, category], index) => (
            <ScrollReveal
              key={key}
              className="glass-card spotlight-card rounded-2xl p-6 lg:p-8 h-full"
              direction={index % 2 === 0 ? "up" : "left"}
            >
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/10">
                <div className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold border ${category.color} ${category.bg} ${category.border}`}>
                  {category.label}
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{category.items.length} skills</span>
              </div>

              <div className="space-y-5">
                {category.items.map((skill) => (
                  <SkillBar key={skill.name} {...skill} />
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up" className="glass-card spotlight-card rounded-2xl p-8 mb-16 motion-sheen">
          <h3 className="section-accent font-display font-bold text-xl text-slate-900 dark:text-white mb-8 text-center">Tools & Ecosystem</h3>
          <div className="flex flex-wrap justify-center gap-2.5">
            {[
              "Laravel", "PHP", "MySQL", "HTML5", "CSS3",
              "Bootstrap 5", "JavaScript", "React", "Blade", "Tailwind CSS",
              "Alpine.js", "Git", "GitHub", "XAMPP", "VS Code",
              "MVC Architecture", "REST APIs", "CRUD", "Form Validation", "Authentication",
            ].map((tool) => (
              <span key={tool} className="skill-pill">
                {tool}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { title: "System Design", desc: "Scalable architectures for real-world load", emoji: "🏗️" },
            { title: "Debugging", desc: "Root-cause analysis and issue resolution", emoji: "🛠️" },
            { title: "Team Collaboration", desc: "Clear communication and async workflows", emoji: "🤝" },
            { title: "Growth Mindset", desc: "Always learning, always shipping", emoji: "📈" },
          ].map((item) => (
            <ScrollReveal key={item.title} direction="up" className="glass-card spotlight-card rounded-xl p-5 text-center h-full">
              <div className="text-3xl mb-3">{item.emoji}</div>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-2">{item.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </main>
  );
}
