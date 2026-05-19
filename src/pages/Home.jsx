import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Github, Mail, Phone, Sparkles, Code2, Database, Smartphone } from "lucide-react";
import { personal, projects } from "../data/portfolio";
import ProjectCard from "../components/ProjectCard";
import InteractivePanel from "../components/InteractivePanel";
import { easeOutExpo, revealSoft, revealUp, staggerContainer, viewportOnce } from "../utils/motion";

const floatVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

const heroSkillItems = [
  { label: "Laravel / PHP", pct: 95 },
  { label: "React / Next.js", pct: 88 },
  { label: "React Native", pct: 80 },
  { label: "MySQL / Redis", pct: 85 },
];

const homeStats = [
  { value: "6+", label: "Years Experience" },
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "3", label: "Platforms Mastered" },
];

const homeServices = [
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
];

export default function Home() {
  const featured = useMemo(() => projects.filter((p) => p.featured), []);
  const prefersReducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024);
  const heroRef = useRef(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const handleChange = (event) => setIsDesktop(event.matches);
    setIsDesktop(media.matches);
    if (media.addEventListener) {
      media.addEventListener("change", handleChange);
      return () => media.removeEventListener("change", handleChange);
    }
    media.addListener(handleChange);
    return () => media.removeListener(handleChange);
  }, []);

  const allowAmbientMotion = isDesktop && !prefersReducedMotion;
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, allowAmbientMotion ? 60 : 0]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, allowAmbientMotion ? -30 : 0]);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center grid-pattern noise-bg pt-16">
        {/* Background orbs */}
        {isDesktop && (
          <motion.div
            className="absolute top-1/4 right-1/4 h-80 w-80 rounded-full bg-brand-400/8 blur-[48px] pointer-events-none"
            style={{ y: visualY }}
            animate={allowAmbientMotion ? { scale: [1, 1.04, 1], opacity: [0.28, 0.42, 0.28] } : undefined}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <div className="absolute inset-x-0 top-24 bottom-10 pointer-events-none">
          <div className="absolute left-[8%] top-[12%] h-28 w-28 rounded-full border border-brand-300/30" />
          <div className="absolute right-[14%] bottom-[18%] h-20 w-20 rounded-[2rem] border border-white/20 dark:border-brand-300/20 rotate-12" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <motion.div
            variants={staggerContainer(0.08, 0.1)}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            {/* Left: Text */}
            <motion.div style={{ y: heroY }}>
              <motion.div variants={revealSoft} className="mb-6">
                <span className="section-tag">
                  <Sparkles size={11} />
                  Available for new projects
                </span>
              </motion.div>

              <motion.h1 variants={revealUp} className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl dark:text-white leading-[1.05] mb-6">
                Hi, I'm{" "}
                <span className="text-gradient">Hafiz Azrab</span>
              </motion.h1>

              <motion.p variants={revealUp} className="font-display font-medium text-xl sm:text-2xl text-gray-500 dark:text-gray-400 mb-4">
                {personal.tagline}
              </motion.p>

              <motion.p variants={revealUp} className="text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-8 max-w-lg">
                {personal.shortBio}
              </motion.p>

              <motion.div variants={revealUp} className="flex flex-wrap gap-3 mb-10">
                <Link to="/contact" className="btn-primary">
                  Let's work together
                  <ArrowRight size={15} />
                </Link>
                <Link to="/projects" className="btn-ghost">
                  View my work
                </Link>
              </motion.div>

              <motion.div variants={revealUp} className="flex flex-wrap gap-4">
                <a href={personal.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                  <Github size={15} />
                  malikazrab
                </a>
                <a href={`mailto:${personal.email}`}
                  className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                  <Mail size={15} />
                  {personal.email}
                </a>
                <a href={`tel:${personal.phone.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                  <Phone size={15} />
                  {personal.phone}
                </a>
              </motion.div>
            </motion.div>

            {/* Right: Visual card */}
            <motion.div variants={revealSoft} className="hidden lg:flex justify-center" style={{ y: visualY }}>
              <motion.div variants={floatVariants} animate={allowAmbientMotion ? "animate" : undefined} className="relative">
                <motion.div
                  animate={allowAmbientMotion ? { rotate: [0, 0.8, 0, -0.8, 0] } : undefined}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <InteractivePanel
                    className="group w-80 xl:w-96 glass-card spotlight-card rounded-3xl p-8 glow-brand relative overflow-hidden"
                    innerClassName="relative z-10"
                  >
                    <div className="absolute inset-0 opacity-60" style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.18), transparent 35%, transparent 70%, rgba(20,184,166,0.08))" }} />
                    {/* Avatar placeholder */}
                    <div className="relative z-10 w-24 h-24 rounded-2xl brand-gradient flex items-center justify-center text-white font-display font-extrabold text-3xl mb-6 mx-auto shadow-xl shadow-brand-500/30">
                      HA
                    </div>

                    <h3 className="relative z-10 font-display font-bold text-xl dark:text-white text-center mb-1">Hafiz Azrab</h3>
                    <p className="relative z-10 text-sm text-brand-500 font-mono text-center mb-6">Full Stack Developer</p>

                    {/* Skill bars */}
                    <div className="relative z-10 space-y-3">
                      {heroSkillItems.map((s) => (
                        <div key={s.label}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-mono text-gray-600 dark:text-gray-400">{s.label}</span>
                            <span className="font-mono text-brand-500">{s.pct}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-gray-200 dark:bg-dark-500 overflow-hidden">
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.8 }}
                              className="h-full rounded-full brand-gradient origin-left"
                              style={{ width: `${s.pct}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </InteractivePanel>
                </motion.div>

                {/* Floating badges */}
                <motion.div
                  animate={allowAmbientMotion ? { y: [-4, 4, -4] } : undefined}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 glass px-3 py-2 rounded-xl shadow-lg premium-ring"
                >
                  <div className="flex items-center gap-1.5">
                    <Database size={12} className="text-brand-500" />
                    <span className="text-xs font-mono font-medium dark:text-white">Backend First</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={allowAmbientMotion ? { y: [4, -4, 4] } : undefined}
                  transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 glass px-3 py-2 rounded-xl shadow-lg premium-ring"
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
        {isDesktop && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50"
            animate={allowAmbientMotion ? { y: [0, 8, 0], opacity: [0.45, 0.8, 0.45] } : undefined}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-px h-8 bg-gradient-to-b from-brand-500 to-transparent" />
            <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
          </motion.div>
        )}
      </section>

      {/* Stats Strip */}
      <section className="py-12 border-y border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-dark-800/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {homeStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={revealSoft}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ duration: 0.55, delay: i * 0.08 }}
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
            variants={revealSoft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
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
            variants={revealSoft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-12"
          >
            <span className="section-tag mb-4 inline-flex">What I do</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl dark:text-white">Services & Expertise</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeServices.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={viewportOnce}
                transition={{ delay: i * 0.1, duration: 0.7, ease: easeOutExpo }}
                className="group"
              >
                <InteractivePanel
                  className="glass-card spotlight-card rounded-2xl p-7 hover:shadow-2xl hover:shadow-brand-500/10 transition-[transform,box-shadow,background-color,border-color] duration-300"
                  innerClassName="relative z-10"
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
                </InteractivePanel>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: easeOutExpo }}
            className="relative overflow-hidden rounded-3xl brand-gradient p-12 text-center shadow-2xl shadow-brand-500/30"
          >
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <motion.div
              className="absolute inset-y-0 -left-1/4 w-1/3 bg-white/10 blur-3xl"
              animate={allowAmbientMotion ? { x: ["0%", "170%", "0%"] } : undefined}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative z-10">
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-4">
                Got a project in mind?
              </h2>
              <p className="text-white/80 text-base sm:text-lg mb-8 max-w-lg mx-auto">
                I'm currently available for freelance projects and full-time opportunities. Let's build something great together.
              </p>
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-600 rounded-xl font-display font-bold hover:bg-brand-50 active:scale-95 transition-[background-color,transform,box-shadow] duration-200 shadow-lg">
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
