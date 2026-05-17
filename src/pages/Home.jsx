import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Github, Mail, Phone, Download, Sparkles, Code2, Database, Smartphone } from "lucide-react";
import { personal, skills, projects } from "../data/portfolio";
import ProjectCard from "../components/ProjectCard";

const floatVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center grid-pattern noise-bg pt-16">
        {/* Background orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-brand-400/10 blur-3xl animate-pulse2 pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/6 w-64 h-64 rounded-full bg-brand-600/8 blur-2xl animate-pulse2 pointer-events-none" style={{ animationDelay: "1.5s" }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            {/* Left: Text */}
            <div>
              <motion.div variants={itemVariants} className="mb-6">
                <span className="section-tag">
                  <Sparkles size={11} />
                  Available for new projects
                </span>
              </motion.div>

              <motion.h1 variants={itemVariants} className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl dark:text-white leading-[1.05] mb-6">
                Hi, I'm{" "}
                <span className="text-gradient">Hafiz Azrab</span>
              </motion.h1>

              <motion.p variants={itemVariants} className="font-display font-medium text-xl sm:text-2xl text-gray-500 dark:text-gray-400 mb-4">
                {personal.tagline}
              </motion.p>

              <motion.p variants={itemVariants} className="text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-8 max-w-lg">
                {personal.shortBio}
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-10">
                <Link to="/contact" className="btn-primary">
                  Let's work together
                  <ArrowRight size={15} />
                </Link>
                <Link to="/projects" className="btn-ghost">
                  View my work
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <a href={personal.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                  <Github size={15} />
                  malikazrab
                </a>
                <a href={`mailto:${personal.email}`}
                  className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                  <Mail size={15} />
                  malikazrab2007@gmail.com
                </a>
                <a href={`tel:+923242349720`}
                  className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                  <Phone size={15} />
                  +92 (324) 2349720
                </a>
              </motion.div>
            </div>

            {/* Right: Visual card */}
            <motion.div variants={itemVariants} className="hidden lg:flex justify-center">
              <motion.div variants={floatVariants} animate="animate" className="relative">
                <div className="w-80 xl:w-96 glass-card rounded-3xl p-8 glow-brand">
                  {/* Avatar placeholder */}
                  <div className="w-24 h-24 rounded-2xl brand-gradient flex items-center justify-center text-white font-display font-extrabold text-3xl mb-6 mx-auto shadow-xl shadow-brand-500/30">
                    HA
                  </div>

                  <h3 className="font-display font-bold text-xl dark:text-white text-center mb-1">Hafiz Azrab</h3>
                  <p className="text-sm text-brand-500 font-mono text-center mb-6">Full Stack Developer</p>

                  {/* Skill bars */}
                  <div className="space-y-3">
                    {[
                      { label: "Laravel / PHP", pct: 95 },
                      { label: "React / Next.js", pct: 88 },
                      { label: "React Native", pct: 80 },
                      { label: "MySQL / Redis", pct: 85 },
                    ].map((s) => (
                      <div key={s.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-mono text-gray-600 dark:text-gray-400">{s.label}</span>
                          <span className="font-mono text-brand-500">{s.pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-gray-200 dark:bg-dark-500 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${s.pct}%` }}
                            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                            className="h-full rounded-full brand-gradient"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 glass px-3 py-2 rounded-xl shadow-lg"
                >
                  <div className="flex items-center gap-1.5">
                    <Database size={12} className="text-brand-500" />
                    <span className="text-xs font-mono font-medium dark:text-white">Backend First</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 glass px-3 py-2 rounded-xl shadow-lg"
                >
                  <div className="flex items-center gap-1.5">
                    <Smartphone size={12} className="text-brand-500" />
                    <span className="text-xs font-mono font-medium dark:text-white">Mobile Dev</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce opacity-50">
          <div className="w-px h-8 bg-gradient-to-b from-brand-500 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-12 border-y border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-dark-800/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { value: "6+", label: "Years Experience" },
              { value: "50+", label: "Projects Delivered" },
              { value: "30+", label: "Happy Clients" },
              { value: "3", label: "Platforms Mastered" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center"
              >
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
          >
            <div>
              <span className="section-tag mb-4 inline-flex">Featured Work</span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl dark:text-white">Projects I'm proud of</h2>
            </div>
            <Link to="/projects" className="btn-ghost flex-shrink-0">
              All projects <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Strip */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-dark-800/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="section-tag mb-4 inline-flex">What I do</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl dark:text-white">Services & Expertise</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Database size={24} />,
                title: "Backend Development",
                desc: "Scalable REST APIs, database architecture, queue systems, and server-side logic using Laravel & PHP.",
                tags: ["Laravel", "PHP", "MySQL", "Redis"],
              },
              {
                icon: <Code2 size={24} />,
                title: "Web Development",
                desc: "Full-stack web apps with React and Next.js frontends connected to robust Laravel backends.",
                tags: ["React", "Next.js", "Tailwind"],
              },
              {
                icon: <Smartphone size={24} />,
                title: "Mobile Development",
                desc: "Cross-platform iOS & Android apps using React Native, connected to Laravel REST APIs.",
                tags: ["React Native", "iOS", "Android"],
              },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-7 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-500 mb-5 group-hover:bg-brand-100 dark:group-hover:bg-brand-900/30 transition-colors">
                  {service.icon}
                </div>
                <h3 className="font-display font-bold text-lg dark:text-white mb-3">{service.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{service.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((t) => (
                    <span key={t} className="skill-pill text-xs">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl brand-gradient p-12 text-center shadow-2xl shadow-brand-500/30"
          >
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="relative z-10">
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-4">
                Got a project in mind?
              </h2>
              <p className="text-white/80 text-base sm:text-lg mb-8 max-w-lg mx-auto">
                I'm currently available for freelance projects and full-time opportunities. Let's build something great together.
              </p>
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-600 rounded-xl font-display font-bold hover:bg-brand-50 active:scale-95 transition-all duration-200 shadow-lg">
                Start a conversation
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
