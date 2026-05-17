import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Github, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import { personal } from "../data/portfolio";

function ContactCard({ icon, label, value, href }) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -3 }}
      className="glass-card rounded-xl p-5 flex items-center gap-4 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-lg hover:shadow-brand-500/10 transition-all duration-200 group"
    >
      <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-500 group-hover:scale-110 transition-transform duration-200">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 dark:text-gray-600 font-mono mb-0.5">{label}</p>
        <p className="text-sm font-display font-semibold dark:text-white truncate">{value}</p>
      </div>
    </motion.a>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email is required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim() || form.message.length < 20) e.message = "Message must be at least 20 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    // Simulated submit — wire up your backend/Formspree/EmailJS here
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const inputBase =
    "w-full px-4 py-3 rounded-xl text-sm border bg-white dark:bg-dark-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200";
  const inputNormal = "border-gray-200 dark:border-white/10 focus:border-brand-400 dark:focus:border-brand-500 focus:ring-brand-400/20";
  const inputError = "border-red-300 dark:border-red-700 focus:border-red-400 focus:ring-red-400/20";

  return (
    <main className="page-section pt-28">
      <div className="container-tight">
        <SectionHeader
          tag="// let's talk"
          title="Get in touch"
          subtitle="Whether you have a project idea, a job opportunity, or just want to say hi — I'd love to hear from you."
          center
        />

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left: Info */}
          <div className="lg:col-span-2 space-y-5">
            <ContactCard
              icon={<Mail size={16} />}
              label="Email"
              value={personal.email}
              href={`mailto:${personal.email}`}
            />
            <ContactCard
              icon={<Phone size={16} />}
              label="Phone"
              value={personal.phone}
              href={`tel:+923242349720`}
            />
            <ContactCard
              icon={<Github size={16} />}
              label="GitHub"
              value={`github.com/${personal.github}`}
              href={personal.githubUrl}
            />
            <ContactCard
              icon={<MapPin size={16} />}
              label="Location"
              value="Pakistan (Remote worldwide)"
              href="#"
            />

            {/* Availability notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-xl p-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-display font-semibold text-sm dark:text-white">Currently Available</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Open to freelance projects, contract work, and full-time opportunities. Typical response time: <strong className="text-brand-500">under 24 hours</strong>.
              </p>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-500 mx-auto mb-5">
                      <CheckCircle2 size={30} />
                    </div>
                    <h3 className="font-display font-bold text-xl dark:text-white mb-3">Message Sent!</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 max-w-xs mx-auto">
                      Thanks for reaching out. I'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="btn-ghost"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono font-medium text-gray-500 dark:text-gray-400 mb-1.5">Your name *</label>
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
                        <label className="block text-xs font-mono font-medium text-gray-500 dark:text-gray-400 mb-1.5">Email address *</label>
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
                      <label className="block text-xs font-mono font-medium text-gray-500 dark:text-gray-400 mb-1.5">Subject *</label>
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
                      <label className="block text-xs font-mono font-medium text-gray-500 dark:text-gray-400 mb-1.5">Message *</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Tell me about your project, timeline, and budget..."
                        className={`${inputBase} ${errors.message ? inputError : inputNormal} resize-none`}
                      />
                      <div className="flex justify-between mt-1">
                        {errors.message ? (
                          <p className="text-xs text-red-500">{errors.message}</p>
                        ) : (
                          <span />
                        )}
                        <span className={`text-xs font-mono ${form.message.length < 20 ? "text-gray-400" : "text-brand-500"}`}>
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

                    <p className="text-xs text-center text-gray-400 dark:text-gray-600 font-mono">
                      Or email me directly at{" "}
                      <a href={`mailto:${personal.email}`} className="text-brand-500 hover:underline">
                        {personal.email}
                      </a>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
