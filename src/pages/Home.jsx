import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Code2, Database, Github, Mail, Phone, Smartphone, Sparkles } from "lucide-react";
import { personal, projects } from "../data/portfolio";
import ProjectCard from "../components/ProjectCard";
import InteractivePanel from "../components/InteractivePanel";
import ScrollReveal from "../components/ScrollReveal";

const heroSkillItems = [
  { label: "Laravel / PHP", pct: 95 },
  { label: "React / Next.js", pct: 88 },
  { label: "React Native", pct: 80 },
  { label: "MySQL / Redis", pct: 85 },
];

const homeStats = [
  { target: "6+", label: "Years Experience" },
  { target: "50+", label: "Projects Delivered" },
  { target: "30+", label: "Happy Clients" },
  { target: "3", label: "Platforms Mastered" },
];

const homeServices = [
  {
    icon: <Database size={22} />,
    title: "Backend Development",
    desc: "Scalable REST APIs, database architecture, queue systems, and server-side logic using Laravel and PHP.",
    tags: ["Laravel", "PHP", "MySQL", "Redis"],
  },
  {
    icon: <Code2 size={22} />,
    title: "Web Development",
    desc: "Full-stack web apps with React and Next.js frontends connected to reliable Laravel backends.",
    tags: ["React", "Next.js", "Tailwind"],
  },
  {
    icon: <Smartphone size={22} />,
    title: "Mobile Development",
    desc: "Cross-platform iOS and Android apps using React Native, connected to Laravel REST APIs.",
    tags: ["React Native", "iOS", "Android"],
  },
];

function StatTile({ value, label }) {
  return (
    <div className="text-center">
      <div className="font-display font-semibold text-2xl sm:text-3xl text-gradient mb-1">{value}</div>
      <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
}

export default function Home() {
  const featured = useMemo(() => projects.filter((project) => project.featured), []);

  return (
    <main className="page-shell overflow-hidden">
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center pt-20 noise-bg">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
            <div>
              <ScrollReveal direction="up" className="mb-6">
                <span className="section-tag pulse-soft">
                  <Sparkles size={11} />
                  Available for new projects
                </span>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={40}>
                <h1 className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-slate-900 dark:text-white mb-5">
                  Hi, I’m <span className="text-gradient">Hafiz Azrab</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={80}>
                <p className="font-display font-medium text-xl sm:text-2xl text-slate-600 dark:text-slate-400 mb-4">
                  {personal.tagline}
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={110}>
                <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mb-8">
                  {personal.shortBio}
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={140} className="flex flex-wrap gap-3 mb-8">
                <Link to="/contact" className="btn-primary">
                  Let&apos;s work together
                  <ArrowRight size={15} />
                </Link>
                <Link to="/projects" className="btn-ghost">
                  View my work
                </Link>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={170} className="flex flex-wrap gap-4">
                <a href={personal.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-400 transition-colors">
                  <Github size={15} />
                  malikazrab
                </a>
                <a href={`mailto:${personal.email}`} className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-400 transition-colors">
                  <Mail size={15} />
                  {personal.email}
                </a>
                <a href={`tel:${personal.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-400 transition-colors">
                  <Phone size={15} />
                  {personal.phone}
                </a>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={120}>
              <InteractivePanel className="glass-card spotlight-card rounded-[1.75rem] p-6 sm:p-8 hero-float motion-sheen" innerClassName="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs font-mono text-cyan-200/80">Profile</p>
                    <h2 className="font-display font-semibold text-2xl text-white mt-1">{personal.name}</h2>
                    <p className="text-sm text-cyan-200/90 mt-1">{personal.title}</p>
                  </div>
                  <div className="w-16 h-16 rounded-2xl brand-gradient flex items-center justify-center text-white font-display font-semibold text-xl shadow-lg shadow-cyan-500/20 pulse-soft">
                    HA
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {heroSkillItems.map((skill) => (
                    <div key={skill.label}>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-mono text-slate-300">{skill.label}</span>
                        <span className="font-mono text-cyan-300">{skill.pct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full brand-gradient bar-fill" style={{ width: `${skill.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {homeStats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl bg-white/5 border border-white/10 px-4 py-4 motion-sheen">
                      <StatTile value={stat.value || stat.target} label={stat.label} />
                    </div>
                  ))}
                </div>
              </InteractivePanel>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-12 border-y border-white/10 bg-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
            {homeStats.map((stat) => (
              <StatTile key={stat.label} value={stat.target} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="section-tag mb-4 inline-flex">Featured Work</span>
              <h2 className="font-display font-semibold text-3xl sm:text-4xl text-slate-900 dark:text-white">Projects I’m proud of</h2>
            </div>
            <Link to="/projects" className="btn-ghost self-start">
              All projects <ArrowRight size={14} />
            </Link>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-10">
            <span className="section-tag mb-4 inline-flex">What I do</span>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl text-slate-900 dark:text-white">Services & Expertise</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeServices.map((service) => (
              <ScrollReveal key={service.title} direction="up">
                <InteractivePanel className="glass-card spotlight-card rounded-2xl p-6 h-full motion-sheen" innerClassName="relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-cyan-300 mb-5">
                    {service.icon}
                  </div>
                  <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{service.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <span key={tag} className="skill-pill">{tag}</span>
                    ))}
                  </div>
                </InteractivePanel>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="up" className="relative overflow-hidden rounded-[1.75rem] brand-gradient p-10 sm:p-12 text-center shadow-2xl shadow-cyan-500/20 motion-sheen">
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="relative z-10">
              <h2 className="font-display font-semibold text-3xl sm:text-4xl text-white mb-4">Got a project in mind?</h2>
              <p className="text-white/80 text-base sm:text-lg mb-8 max-w-lg mx-auto">
                I’m available for freelance work and full-time opportunities. Let’s build something that performs well and ships cleanly.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-950 text-cyan-100 rounded-xl font-display font-semibold text-sm hover:bg-slate-900 transition-colors motion-sheen">
                Start a conversation
                <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
