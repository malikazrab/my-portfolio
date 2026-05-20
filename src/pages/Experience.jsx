import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Calendar, CheckCircle2, Award } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import ScrollReveal from "../components/ScrollReveal";
import { experience } from "../data/portfolio";
import InteractivePanel from "../components/InteractivePanel";

gsap.registerPlugin(ScrollTrigger);

function ExperienceCard({ exp }) {
  const cardRef = useRef(null);
  const dotRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    const dot = dotRef.current;
    const content = contentRef.current;
    if (!el || !dot || !content) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(dot, { scale: 1, opacity: 1 });
        gsap.set(content, { x: 0, opacity: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        }
      });

      tl.fromTo(dot,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.6)" }
      );

      tl.fromTo(content,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.75, ease: "power3.out" },
        "-=0.35"
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={cardRef} className="relative mb-12 last:mb-0">
      <div className="flex gap-5 sm:gap-8">
        {/* Timeline dot */}
        <div ref={dotRef} className="hidden sm:flex flex-col items-center flex-shrink-0 opacity-0">
          <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center shadow-lg shadow-brand-500/30 relative z-10">
            <Briefcase size={18} className="text-white" />
          </div>
        </div>

        {/* Card */}
        <div ref={contentRef} className="flex-1 opacity-0">
          <InteractivePanel
            className="glass-card rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300"
            innerClassName="relative z-10"
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
              <h4 className="section-accent font-display font-semibold text-sm dark:text-white mb-5">Key Achievements</h4>
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
          </InteractivePanel>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const timelineContainerRef = useRef(null);
  const lineProgressRef = useRef(null);
  const achievementsRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!timelineContainerRef.current || !lineProgressRef.current || !achievementsRef.current) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(lineProgressRef.current, { scaleY: 1 });
        gsap.set(achievementsRef.current.querySelectorAll(".milestone-stat-anim"), { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        lineProgressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineContainerRef.current,
            start: "top 35%",
            end: "bottom 65%",
            scrub: 0.5,
            invalidateOnRefresh: true
          }
        }
      );

      gsap.fromTo(
        achievementsRef.current.querySelectorAll(".milestone-stat-anim"),
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: achievementsRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="page-section pt-28">
      <div className="container-tight">
        <SectionHeader
          tag="// career"
          title="Work Experience"
          subtitle="Over 6 years of professional software development — from freelancing to full-time engineering roles."
        />

        {/* Timeline container */}
        <div ref={timelineContainerRef} className="relative mb-20">
          {/* Static timeline line background */}
          <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-gray-200 dark:bg-dark-700 hidden sm:block pointer-events-none" />
          
          {/* Animated drawing line indicator */}
          <div
            ref={lineProgressRef}
            className="absolute left-[23px] top-6 bottom-6 w-[2px] brand-gradient origin-top hidden sm:block pointer-events-none"
            style={{ transform: "scaleY(0)" }}
          />

          {experience.map((exp, i) => (
            <ExperienceCard key={exp.company + exp.role} exp={exp} />
          ))}
        </div>

        {/* Achievements */}
        <ScrollReveal className="glass-card spotlight-card rounded-2xl p-8 mb-12" direction="up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-500">
              <Award size={18} />
            </div>
            <h3 className="font-display font-bold text-xl dark:text-white">Milestones</h3>
          </div>

          <div ref={achievementsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: "50+", label: "Projects delivered" },
              { value: "6+", label: "Years experience" },
              { value: "30+", label: "Happy clients" },
              { value: "3", label: "Platforms mastered" },
            ].map((m) => (
              <div
                key={m.label}
                className="text-center milestone-stat-anim opacity-0"
              >
                <div className="font-display font-extrabold text-3xl text-gradient mb-1">{m.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{m.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Availability */}
        <ScrollReveal className="relative overflow-hidden rounded-2xl brand-gradient p-8 text-white text-center shadow-2xl shadow-brand-500/25" direction="up">
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
        </ScrollReveal>
      </div>
    </main>
  );
}
