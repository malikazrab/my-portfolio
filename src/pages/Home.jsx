import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Github, Mail, Phone, Sparkles, Code2, Database, Smartphone } from "lucide-react";
import { personal, projects } from "../data/portfolio";
import ProjectCard from "../components/ProjectCard";
import InteractivePanel from "../components/InteractivePanel";
import ScrollReveal from "../components/ScrollReveal";
import Magnetic from "../components/Magnetic";

gsap.registerPlugin(ScrollTrigger);

const heroSkillItems = [
  { label: "Laravel / PHP", pct: 95 },
  { label: "React / Next.js", pct: 88 },
  { label: "React Native", pct: 80 },
  { label: "MySQL / Redis", pct: 85 },
];

const homeStats = [
  { target: 6, label: "Years Experience", suffix: "+" },
  { target: 50, label: "Projects Delivered", suffix: "+" },
  { target: 30, label: "Happy Clients", suffix: "+" },
  { target: 3, label: "Platforms Mastered", suffix: "" },
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

function StatCountUp({ target, suffix, label }) {
  const elementRef = useRef(null);
  const numberRef = useRef(null);

  useEffect(() => {
    const numEl = numberRef.current;
    if (!numEl || !elementRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        numEl,
        { textContent: "0" },
        {
          textContent: target.toString(),
          duration: 1.6,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: elementRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, elementRef);

    return () => ctx.revert();
  }, [target]);

  return (
    <div ref={elementRef} className="text-center">
      <div className="font-display font-extrabold text-3xl sm:text-4xl text-gradient mb-1">
        <span ref={numberRef}>0</span>{suffix}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  );
}

export default function Home() {
  const featured = useMemo(() => projects.filter((p) => p.featured), []);
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024);
  const containerRef = useRef(null);
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

  // GSAP Entrance and Parallax animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const scope = containerRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      const tag = scope.querySelector(".hero-tag-anim");
      const chars = scope.querySelectorAll(".hero-char-anim");
      const sub = scope.querySelector(".hero-sub-anim");
      const bio = scope.querySelector(".hero-bio-anim");
      const cta = scope.querySelector(".hero-cta-anim");
      const social = scope.querySelectorAll(".hero-social-anim");
      const visual = scope.querySelector(".hero-visual-anim");

      const tl = gsap.timeline();

      if (tag) {
        tl.fromTo(tag,
          { opacity: 0, scale: 0.9, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: "power3.out" }
        );
      }

      if (chars.length) {
        tl.to(chars, {
          y: "0%",
          duration: 0.8,
          stagger: 0.08,
          ease: "power4.out",
        }, "-=0.5");
      }

      if (sub) {
        tl.fromTo(sub,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.5"
        );
      }

      if (bio) {
        tl.fromTo(bio,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.55"
        );
      }

      if (cta) {
        tl.fromTo(cta,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.55"
        );
      }

      if (social.length) {
        tl.fromTo(social,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: "power3.out" },
          "-=0.55"
        );
      }

      if (visual) {
        tl.fromTo(visual,
          { opacity: 0, scale: 0.96, y: 25 },
          { opacity: 1, scale: 1, y: 0, duration: 0.95, ease: "power4.out" },
          "-=0.8"
        );
      }

      if (isDesktop && heroRef.current) {
        const hero = heroRef.current;
        const orb = scope.querySelector(".hero-parallax-orb");
        const decor1 = scope.querySelector(".hero-parallax-decor-1");
        const decor2 = scope.querySelector(".hero-parallax-decor-2");

        // Use will-change for GPU acceleration
        if (orb) orb.style.willChange = "transform";
        if (decor1) decor1.style.willChange = "transform";
        if (decor2) decor2.style.willChange = "transform";

        if (orb) {
          gsap.to(orb, {
            yPercent: 40,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 0.5, // Lighter scrub for smoother feel
              invalidateOnRefresh: true
            }
          });
        }

        if (decor1) {
          gsap.to(decor1, {
            yPercent: -25,
            rotate: 30,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
              invalidateOnRefresh: true
            }
          });
        }

        if (decor2) {
          gsap.to(decor2, {
            yPercent: 15,
            rotate: -20,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
              invalidateOnRefresh: true
            }
          });
        }
      }
    }, scope);

    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <div ref={containerRef} className="overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center grid-pattern noise-bg pt-16">
        {/* Background orbs */}
        {isDesktop && (
          <div className="absolute top-1/4 right-1/4 h-80 w-80 rounded-full bg-brand-400/8 blur-[48px] pointer-events-none hero-parallax-orb" />
        )}
        <div className="absolute inset-x-0 top-24 bottom-10 pointer-events-none">
          <div className="absolute left-[8%] top-[12%] h-28 w-28 rounded-full border border-brand-300/30 hero-parallax-decor-1" />
          <div className="absolute right-[14%] bottom-[18%] h-20 w-20 rounded-[2rem] border border-white/20 dark:border-brand-300/20 rotate-12 hero-parallax-decor-2" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Text */}
            <div>
              <div className="mb-6 hero-tag-anim">
                <span className="section-tag">
                  <Sparkles size={11} />
                  Available for new projects
                </span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl dark:text-white leading-[1.05] mb-6">
                <span className="inline-block overflow-hidden mr-2 sm:mr-3">
                  <span className="inline-block translate-y-[102%] hero-char-anim">Hi,</span>
                </span>
                <span className="inline-block overflow-hidden mr-2 sm:mr-3">
                  <span className="inline-block translate-y-[102%] hero-char-anim">I'm</span>
                </span>
                <span className="inline-block overflow-hidden mr-2 sm:mr-3">
                  <span className="inline-block translate-y-[102%] hero-char-anim text-gradient">Hafiz</span>
                </span>
                <span className="inline-block overflow-hidden">
                  <span className="inline-block translate-y-[102%] hero-char-anim text-gradient">Azrab</span>
                </span>
              </h1>

              <p className="hero-sub-anim font-display font-medium text-xl sm:text-2xl text-gray-500 dark:text-gray-400 mb-4">
                {personal.tagline}
              </p>

              <p className="hero-bio-anim text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-8 max-w-lg">
                {personal.shortBio}
              </p>

              <div className="hero-cta-anim flex flex-wrap gap-3 mb-10">
                <Magnetic speed={0.4} range={12}>
                  <Link to="/contact" className="btn-primary">
                    Let's work together
                    <ArrowRight size={15} />
                  </Link>
                </Magnetic>
                <Magnetic speed={0.4} range={12}>
                  <Link to="/projects" className="btn-ghost">
                    View my work
                  </Link>
                </Magnetic>
              </div>

              <div className="flex flex-wrap gap-4">
                <Magnetic speed={0.3} range={8}>
                  <a href={personal.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="hero-social-anim flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                    <Github size={15} />
                    malikazrab
                  </a>
                </Magnetic>
                <Magnetic speed={0.3} range={8}>
                  <a href={`mailto:${personal.email}`}
                    className="hero-social-anim flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                    <Mail size={15} />
                    {personal.email}
                  </a>
                </Magnetic>
                <Magnetic speed={0.3} range={8}>
                  <a href={`tel:${personal.phone.replace(/[^+\d]/g, "")}`}
                    className="hero-social-anim flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                    <Phone size={15} />
                    {personal.phone}
                  </a>
                </Magnetic>
              </div>
            </div>

            {/* Right: Visual card */}
            <div className="hidden lg:flex justify-center hero-visual-anim">
              <div className="relative">
                <InteractivePanel
                  className="group w-80 xl:w-96 glass-card spotlight-card rounded-3xl p-8 glow-brand relative overflow-hidden"
                  innerClassName="relative z-10"
                >
                  <div className="absolute inset-0 opacity-60" style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.18), transparent 35%, transparent 70%, rgba(20,184,166,0.08))" }} />
                  {/* Avatar */}
                  <div className="relative z-10 w-24 h-24 rounded-2xl brand-gradient flex items-center justify-center text-white font-display font-extrabold text-3xl mb-6 mx-auto shadow-xl shadow-brand-500/30 animate-[bounce_5s_infinite_ease-in-out]">
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
                          <div
                            className="h-full rounded-full brand-gradient origin-left animate-[pulse_2s_infinite]"
                            style={{ width: `${s.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </InteractivePanel>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 glass px-3 py-2 rounded-xl shadow-lg premium-ring animate-[bounce_4s_infinite_ease-in-out]">
                  <div className="flex items-center gap-1.5">
                    <Database size={12} className="text-brand-500" />
                    <span className="text-xs font-mono font-medium dark:text-white">Backend First</span>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 glass px-3 py-2 rounded-xl shadow-lg premium-ring animate-[bounce_4.5s_infinite_ease-in-out]">
                  <div className="flex items-center gap-1.5">
                    <Smartphone size={12} className="text-brand-500" />
                    <span className="text-xs font-mono font-medium dark:text-white">Mobile Dev</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        {isDesktop && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 animate-[bounce_3s_infinite]">
            <div className="w-px h-8 bg-gradient-to-b from-brand-500 to-transparent" />
            <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
          </div>
        )}
      </section>

      {/* Stats Strip */}
      <section className="py-12 border-y border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-dark-800/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {homeStats.map((stat) => (
              <StatCountUp
                key={stat.label}
                target={stat.target}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12" direction="up">
            <div>
              <span className="section-tag mb-4 inline-flex">Featured Work</span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl dark:text-white">Projects I'm proud of</h2>
            </div>
            <Magnetic speed={0.4} range={10}>
              <Link to="/projects" className="btn-ghost flex-shrink-0">
                All projects <ArrowRight size={14} />
              </Link>
            </Magnetic>
          </ScrollReveal>

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
          <ScrollReveal className="text-center mb-12" direction="up">
            <span className="section-tag mb-4 inline-flex">What I do</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl dark:text-white">Services & Expertise</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeServices.map((service, i) => (
              <ScrollReveal
                key={service.title}
                direction="up"
                delay={i * 0.08}
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
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal
            direction="up"
            amount={0.96}
            duration={0.8}
            className="relative overflow-hidden rounded-3xl brand-gradient p-12 text-center shadow-2xl shadow-brand-500/30"
          >
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="absolute inset-y-0 -left-1/4 w-1/3 bg-white/10 blur-3xl animate-[pulse_8s_infinite_ease-in-out]" />
            <div className="relative z-10">
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-4">
                Got a project in mind?
              </h2>
              <p className="text-white/80 text-base sm:text-lg mb-8 max-w-lg mx-auto">
                I'm currently available for freelance projects and full-time opportunities. Let's build something great together.
              </p>
              <Magnetic speed={0.4} range={12}>
                <Link to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-600 rounded-xl font-display font-bold hover:bg-brand-50 active:scale-95 transition-[background-color,transform,box-shadow] duration-200 shadow-lg">
                  Start a conversation
                  <ArrowRight size={16} />
                </Link>
              </Magnetic>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
