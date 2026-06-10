import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Code2, Coffee, Github, Heart, Mail, MapPin, Phone } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import InteractivePanel from "../components/InteractivePanel";
import ScrollReveal from "../components/ScrollReveal";
import { personal } from "../data/portfolio";

export default function About() {
  return (
    <main className="page-shell page-section pt-28">
      <div className="container-tight">
        <SectionHeader
          tag="// about me"
          title="The person behind the code"
          subtitle="A short overview of my background, values, and the way I like to build software."
        />

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-2 space-y-5">
            <ScrollReveal direction="up">
              <InteractivePanel className="glass-card spotlight-card rounded-3xl p-7 text-center h-full" innerClassName="relative z-10">
                <div className="w-28 h-28 rounded-2xl brand-gradient flex items-center justify-center text-white font-display font-semibold text-4xl mx-auto mb-5 shadow-2xl shadow-cyan-500/25">
                  HA
                </div>
                <h2 className="font-display font-semibold text-2xl text-slate-900 dark:text-white mb-1">{personal.name}</h2>
                <p className="text-cyan-300 font-mono text-sm mb-5">{personal.title}</p>

                <div className="flex justify-center gap-3 mb-6">
                  <a href={personal.githubUrl} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub">
                    <Github size={16} />
                  </a>
                  <a href={`mailto:${personal.email}`} className="icon-btn" aria-label="Email">
                    <Mail size={16} />
                  </a>
                  <a href={`tel:${personal.phone.replace(/[^+\d]/g, "")}`} className="icon-btn" aria-label="Phone">
                    <Phone size={16} />
                  </a>
                </div>

                <div className="space-y-2 text-left">
                  {[
                    { icon: <MapPin size={13} />, value: personal.location },
                    { icon: <Mail size={13} />, value: personal.email },
                    { icon: <Phone size={13} />, value: personal.phone },
                    { icon: <Github size={13} />, value: `github.com/${personal.github}` },
                  ].map((item) => (
                    <div key={item.value} className="flex items-center gap-2.5 text-sm text-slate-500 dark:text-slate-400">
                      <span className="text-cyan-300 shrink-0">{item.icon}</span>
                      <span className="font-mono text-xs truncate">{item.value}</span>
                    </div>
                  ))}
                </div>
              </InteractivePanel>
            </ScrollReveal>

            <ScrollReveal direction="up">
              <InteractivePanel className="glass-card spotlight-card rounded-2xl p-6 h-full" innerClassName="relative z-10">
                <h3 className="font-display font-semibold text-sm text-slate-900 dark:text-white mb-4">Quick Notes</h3>
                <div className="space-y-3">
                  {[
                    { icon: <Coffee size={13} />, text: "Coffee-powered developer" },
                    { icon: <Code2 size={13} />, text: "Backend-first engineering style" },
                    { icon: <Heart size={13} />, text: "Clean code and clear handoff" },
                    { icon: <BookOpen size={13} />, text: "Always learning something new" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2.5 text-sm text-slate-500 dark:text-slate-400">
                      <span className="text-cyan-300">{item.icon}</span>
                      {item.text}
                    </div>
                  ))}
                </div>
              </InteractivePanel>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <ScrollReveal direction="up" className="section-shell">
              <h3 className="font-display font-semibold text-xl text-slate-900 dark:text-white mb-4">My Story</h3>
              <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  I started in web development over six years ago, drawn to the challenge of building systems that are actually dependable. PHP and Laravel became my foundation, and that pulled me deeper into databases, queues, caching, APIs, and the practical details behind fast software.
                </p>
                <p>
                  Over time, I moved into full-stack work with React, Next.js, and React Native. The frontend matters to me, but the backend is where I naturally spend most of my attention, especially when the goal is something scalable and maintainable.
                </p>
                <p>
                  I’ve worked with startups, agencies, and direct clients across e-commerce, healthcare, real estate, and logistics. The constant thread is simple: ship software that is clear to maintain and fast enough to feel effortless.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" className="section-shell">
              <h3 className="font-display font-semibold text-xl text-slate-900 dark:text-white mb-4">How I Work</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: "Architecture First", desc: "I design the system before the code so the shape of the solution stays clean." },
                  { title: "Performance Focused", desc: "I keep an eye on database queries, cache behavior, and the cost of every request." },
                  { title: "Readable Code", desc: "The next person should be able to follow the work without deciphering it." },
                  { title: "Ship & Improve", desc: "I prefer a working release with a clear feedback loop over waiting for perfection." },
                ].map((item) => (
                  <div key={item.title} className="glass-card spotlight-card rounded-xl p-5 h-full">
                    <h4 className="font-display font-semibold text-sm text-slate-900 dark:text-white mb-2">{item.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" className="section-shell">
              <h3 className="font-display font-semibold text-xl text-slate-900 dark:text-white mb-4">Education</h3>
              <InteractivePanel className="glass-card spotlight-card rounded-xl p-5 h-full" innerClassName="relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-cyan-300 shrink-0">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-slate-900 dark:text-white">Bachelor of Software Engineering</h4>
                    <p className="text-sm text-cyan-300 font-mono">University of Engineering and Technology • 2025 - 2029</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      Core fundamentals in algorithms, data structures, databases, and software engineering keep shaping how I build and review code.
                    </p>
                  </div>
                </div>
              </InteractivePanel>
            </ScrollReveal>

            <ScrollReveal direction="up" className="flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                Get in touch <ArrowRight size={15} />
              </Link>
              <Link to="/projects" className="btn-ghost">
                See my work
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </main>
  );
}
