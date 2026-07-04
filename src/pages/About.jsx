import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, BookOpen, Code2, Coffee, Github, Heart, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import InteractivePanel from "../components/InteractivePanel";
import ScrollReveal from "../components/ScrollReveal";
import { certifications, education, personal } from "../data/portfolio";

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
              <InteractivePanel className="glass-card spotlight-card rounded-3xl p-6 sm:p-7 text-center h-full" innerClassName="relative z-10">
                <div className="w-28 h-28 rounded-2xl overflow-hidden border border-white/15 mx-auto mb-5 shadow-2xl shadow-cyan-500/25">
                  <img
                    src={personal.photo}
                    alt={personal.photoAlt}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h2 className="font-display font-semibold text-2xl text-slate-900 dark:text-white mb-1">{personal.name}</h2>
                <p className="text-cyan-300 font-mono text-sm mb-5">{personal.title}</p>

                <div className="flex justify-center gap-3 mb-6">
                  <a href={personal.githubUrl} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub">
                    <Github size={16} />
                  </a>
                  <a href={personal.emailHref} className="icon-btn" aria-label="Email">
                    <Mail size={16} />
                  </a>
                  <a href={personal.phoneHref} className="icon-btn" aria-label="Phone">
                    <Phone size={16} />
                  </a>
                </div>

                <div className="space-y-2 text-left">
                  {[
                    { icon: <MapPin size={13} />, value: personal.location },
                    { icon: <Mail size={13} />, value: personal.email },
                    { icon: <Phone size={13} />, value: personal.phone },
                    { icon: <Github size={13} />, value: personal.githubDisplay },
                    { icon: <Linkedin size={13} />, value: personal.linkedinDisplay },
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
                  { icon: <Coffee size={13} />, text: "Passionate about clean, efficient code" },
                  { icon: <Code2 size={13} />, text: "Backend-focused PHP/Laravel development" },
                  { icon: <Heart size={13} />, text: "Building scalable, maintainable systems" },
                  { icon: <BookOpen size={13} />, text: "Continuously exploring new technologies" },
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
                  I’m a Software Engineering student with a passion for full-stack web development using PHP and Laravel. I started with a solid foundation in frontend technologies like HTML5, CSS3, Bootstrap, and JavaScript, then moved deeper into backend work where I found my strongest interest: building scalable, clean, and efficient systems.
                </p>
                <p>
                  My practical experience includes developing a fleet management system, a CMS portal, and CRUD-based applications such as a student registration system. I rely on MVC architecture, clear database design, and well-structured code that is easy to maintain and understand.
                </p>
                <p>
                  I’m constantly learning new technologies and best practices. From Laravel REST APIs and role-based access control to form validation and MySQL relationships, I’ve built a practical foundation in full-stack development while staying backend-first in how I design systems.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" className="section-shell">
              <h3 className="font-display font-semibold text-xl text-slate-900 dark:text-white mb-4">How I Work</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: "MVC Architecture", desc: "I design systems following MVC patterns, keeping logic, views, and controllers properly separated." },
                  { title: "Database First", desc: "Schema design and MySQL relationships stay at the center of how I build reliable apps." },
                  { title: "Clean Code", desc: "Readable, well-structured code with clear naming conventions makes maintenance easier." },
                  { title: "Continuous Learning", desc: "I keep exploring new tools, practices, and patterns to strengthen my craft." },
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
              <div className="space-y-4">
                {education.map((item) => (
                  <InteractivePanel key={`${item.degree}-${item.institution}`} className="glass-card spotlight-card rounded-xl p-5 h-full" innerClassName="relative z-10">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-cyan-300 shrink-0">
                        <BookOpen size={16} />
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-slate-900 dark:text-white">{item.degree}</h4>
                        <p className="text-sm text-cyan-300 font-mono">
                          {item.institution} • {item.period}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </InteractivePanel>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" className="section-shell">
              <h3 className="font-display font-semibold text-xl text-slate-900 dark:text-white mb-4">Certifications</h3>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <InteractivePanel key={`${cert.title}-${cert.date}`} className="glass-card spotlight-card rounded-xl p-5 h-full" innerClassName="relative z-10">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-cyan-300 shrink-0">
                        <Award size={16} />
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-slate-900 dark:text-white">{cert.title}</h4>
                        <p className="text-sm text-cyan-300 font-mono">
                          {cert.issuer} • {cert.date}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          {cert.description}
                        </p>
                      </div>
                    </div>
                  </InteractivePanel>
                ))}
              </div>
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
