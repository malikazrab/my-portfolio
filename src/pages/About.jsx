import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Github, ArrowRight, Heart, Coffee, Code2, BookOpen } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import { personal } from "../data/portfolio";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function About() {
  return (
    <main className="page-section pt-28">
      <div className="container-tight">
        <SectionHeader
          tag="// about me"
          title="The person behind the code"
          subtitle="A bit about my journey, values, and what drives me as a developer."
        />

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left: Avatar + Info Card */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <motion.div variants={itemVariants} className="glass-card rounded-3xl p-8 text-center mb-6">
              {/* Avatar */}
              <div className="w-28 h-28 rounded-2xl brand-gradient flex items-center justify-center text-white font-display font-extrabold text-4xl mx-auto mb-5 shadow-2xl shadow-brand-500/30">
                HA
              </div>
              <h2 className="font-display font-extrabold text-2xl dark:text-white mb-1">{personal.name}</h2>
              <p className="text-brand-500 font-mono text-sm mb-5">{personal.title}</p>

              <div className="flex justify-center gap-3 mb-6">
                <a href={personal.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 hover:border-brand-400 transition-all duration-200">
                  <Github size={16} />
                </a>
                <a href={`mailto:${personal.email}`}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-brand-500 hover:border-brand-400 transition-all duration-200">
                  <Mail size={16} />
                </a>
                <a href={`tel:+923242349720`}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-brand-500 hover:border-brand-400 transition-all duration-200">
                  <Phone size={16} />
                </a>
              </div>

              <div className="space-y-2.5 text-sm text-left">
                {[
                  { icon: <MapPin size={13} />, val: "Pakistan" },
                  { icon: <Mail size={13} />, val: personal.email },
                  { icon: <Phone size={13} />, val: personal.phone },
                  { icon: <Github size={13} />, val: `github.com/${personal.github}` },
                ].map(({ icon, val }) => (
                  <div key={val} className="flex items-center gap-2.5 text-gray-500 dark:text-gray-400">
                    <span className="text-brand-500 flex-shrink-0">{icon}</span>
                    <span className="truncate font-mono text-xs">{val}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Fun facts */}
            <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-bold text-sm dark:text-white mb-4">Fun Facts</h3>
              <div className="space-y-3">
                {[
                  { icon: <Coffee size={13} />, text: "Coffee-powered developer ☕" },
                  { icon: <Code2 size={13} />, text: "6+ years of PHP/Laravel" },
                  { icon: <Heart size={13} />, text: "Clean code advocate" },
                  { icon: <BookOpen size={13} />, text: "Always learning something new" },
                ].map((f) => (
                  <div key={f.text} className="flex items-center gap-2.5 text-sm text-gray-500 dark:text-gray-400">
                    <span className="text-brand-500">{f.icon}</span>
                    {f.text}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Story */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="font-display font-bold text-xl dark:text-white mb-4 flex items-center gap-2">
                <span className="text-brand-500 font-mono text-sm">01.</span> My Story
              </h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  I started my journey in web development over 6 years ago, drawn in by the challenge of building things that actually <em>work</em> — not just things that look good. PHP and Laravel quickly became my foundation, and I fell in love with the backend: the databases, the caching layers, the queues, the APIs that power everything.
                </p>
                <p>
                  Over time, I grew into a full-stack developer. I picked up React for the frontend, Next.js for server-rendered web apps, and React Native for mobile. But the backend remains where I shine — designing robust, scalable architectures that can handle real production load.
                </p>
                <p>
                  I've worked with startups, agencies, and direct clients across e-commerce, healthcare, real estate, and logistics. I care deeply about writing clean, maintainable code and delivering software that solves real problems.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="font-display font-bold text-xl dark:text-white mb-4 flex items-center gap-2">
                <span className="text-brand-500 font-mono text-sm">02.</span> My Approach
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: "Architecture First", desc: "I design the system before writing a line of code. Good architecture saves thousands of hours later." },
                  { title: "Performance Obsessed", desc: "Slow software is broken software. I optimize queries, cache aggressively, and measure everything." },
                  { title: "Clean Code", desc: "I write code for the next developer — readable, tested, and well-documented." },
                  { title: "Ship & Iterate", desc: "Perfect is the enemy of done. I ship working software and improve based on real feedback." },
                ].map((v) => (
                  <div key={v.title} className="glass-card rounded-xl p-5 hover:border-brand-300 dark:hover:border-brand-700 transition-colors">
                    <h4 className="font-display font-semibold text-sm dark:text-white mb-2">{v.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="font-display font-bold text-xl dark:text-white mb-4 flex items-center gap-2">
                <span className="text-brand-500 font-mono text-sm">03.</span> Education
              </h3>
              <div className="glass-card rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-500 flex-shrink-0">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold dark:text-white">Bachelor of Computer Science</h4>
                    <p className="text-sm text-brand-500 font-mono">University • 2018</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                      Core fundamentals in algorithms, data structures, databases, and software engineering that continue to inform my work daily.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-3">
              <Link to="/contact" className="btn-primary">
                Get in touch <ArrowRight size={15} />
              </Link>
              <Link to="/projects" className="btn-ghost">
                See my work
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
