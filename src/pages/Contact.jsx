import React, { memo, useState } from "react";
import { CheckCircle2, Github, Linkedin, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import ScrollReveal from "../components/ScrollReveal";
import { personal } from "../data/portfolio";

const ContactCard = memo(function ContactCard({ icon, label, value, href }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="glass-card rounded-xl p-5 flex items-center gap-4 hover:border-cyan-300/40 transition-colors"
    >
      <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-cyan-300 shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-0.5">{label}</p>
        <p className="text-sm font-display font-semibold text-slate-900 dark:text-white truncate">{value}</p>
      </div>
    </a>
  );
});

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Valid email is required";
    if (!form.subject.trim()) nextErrors.subject = "Subject is required";
    if (!form.message.trim() || form.message.length < 20) nextErrors.message = "Message must be at least 20 characters";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const inputBase = "w-full px-4 py-3 rounded-2xl text-sm border bg-white/5 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-colors";
  const inputNormal = "border-white/10 focus:border-cyan-300/40 focus:ring-cyan-300/15";
  const inputError = "border-red-300 dark:border-red-700 focus:border-red-400 focus:ring-red-400/20";

  return (
    <main className="page-shell page-section pt-28">
      <div className="container-tight">
        <SectionHeader
          tag="// let's talk"
          title="Get in touch"
          subtitle="Project idea, job opportunity, or a quick hello. I’m happy to hear from you."
          center
        />

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          <div className="lg:col-span-2 space-y-5">
            <ContactCard icon={<Mail size={16} />} label="Email" value={personal.email} href={`mailto:${personal.email}`} />
            <ContactCard icon={<Phone size={16} />} label="Phone" value={personal.phone} href={`tel:${personal.phone.replace(/[^+\d]/g, "")}`} />
            <ContactCard icon={<Github size={16} />} label="GitHub" value={`github.com/${personal.github}`} href={personal.githubUrl} />
            <ContactCard icon={<Linkedin size={16} />} label="LinkedIn" value={`linkedin.com/in/${personal.linkedin}`} href={personal.linkedinUrl} />
            <ContactCard
              icon={<MapPin size={16} />}
              label="Location"
              value={personal.location}
              href="https://www.google.com/maps/search/Lahore%2C%20Pakistan"
            />

            <ScrollReveal direction="up" className="glass-card spotlight-card rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-display font-semibold text-sm text-slate-900 dark:text-white">Currently Available</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Open to freelance projects, internships, and full-time opportunities. Typical response time: <strong className="text-cyan-300">under 24 hours</strong>.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="left" delay={60} className="lg:col-span-3">
            <div className="glass-card spotlight-card rounded-2xl p-6 sm:p-8">
              {status === "success" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-2xl bg-green-50/10 border border-green-400/20 flex items-center justify-center text-green-300 mx-auto mb-5">
                    <CheckCircle2 size={30} />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-slate-900 dark:text-white mb-3">Message sent</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 max-w-xs mx-auto">
                    Thanks for reaching out. I’ll get back to you within 24 hours.
                  </p>
                  <button type="button" onClick={() => setStatus("idle")} className="btn-ghost">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono font-medium text-slate-500 dark:text-slate-400 mb-1.5">Your name *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-medium text-slate-500 dark:text-slate-400 mb-1.5">Email address *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-500 dark:text-slate-400 mb-1.5">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Project inquiry / Job opportunity / General question"
                      className={`${inputBase} ${errors.subject ? inputError : inputNormal}`}
                    />
                    {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-500 dark:text-slate-400 mb-1.5">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Tell me about your project, timeline, and budget..."
                      className={`${inputBase} ${errors.message ? inputError : inputNormal} resize-none`}
                    />
                    <div className="flex justify-between mt-1">
                      {errors.message ? <p className="text-xs text-red-500">{errors.message}</p> : <span />}
                      <span className={`text-xs font-mono ${form.message.length < 20 ? "text-slate-500" : "text-cyan-300"}`}>
                        {form.message.length} chars
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary w-full justify-center py-4 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-xs text-center text-slate-500 dark:text-slate-400 font-mono">
                    Or email me directly at{" "}
                    <a href={`mailto:${personal.email}`} className="text-cyan-300 hover:underline">
                      {personal.email}
                    </a>
                  </p>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </main>
  );
}
