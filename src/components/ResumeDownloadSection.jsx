import React, { useMemo, useState } from "react";
import { Download, Mail, ShieldCheck, User } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import InteractivePanel from "./InteractivePanel";
import { personal } from "../data/portfolio";

const initialForm = { name: "", email: "" };

function triggerResumeDownload() {
  const link = document.createElement("a");
  link.href = personal.resumeUrl;
  link.download = "Hafiz-Azrab-CV.pdf";
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export default function ResumeDownloadSection() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const formComplete = useMemo(
    () => form.name.trim().length > 1 && form.email.trim().includes("@"),
    [form.email, form.name]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!formComplete) {
      setStatus("error");
      setMessage("Please enter your name and a valid email first.");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/resume-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          resumeName: "Hafiz Azrab CV",
          resumePath: personal.resumeUrl,
        }),
      });

      triggerResumeDownload();
      if (!response.ok) {
        const fallback = await response.json().catch(() => null);
        setStatus("error");
        setMessage(
          fallback?.error ||
            "Your download started, but the private log could not be saved."
        );
      } else {
        setStatus("success");
        setMessage("Your download has started and was logged privately.");
      }
      setForm(initialForm);
    } catch (error) {
      triggerResumeDownload();
      setStatus("error");
      setMessage(
        error.message ||
          "Your download started, but the private log could not be saved."
      );
    }
  };

  return (
    <ScrollReveal direction="up" className="mt-8 sm:mt-10">
      <InteractivePanel
        className="glass-card spotlight-card rounded-[1.75rem] p-6 sm:p-8 hero-panel motion-sheen"
        innerClassName="relative z-10"
      >
        <div className="flex flex-col lg:flex-row gap-8 lg:items-end">
          <div className="flex-1">
            <span className="section-tag mb-4 inline-flex">
              <Download size={11} />
              Resume Download
            </span>
            <h2 className="font-display font-semibold text-2xl sm:text-3xl text-slate-900 dark:text-white mb-3">
              Download my CV in one click
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              If you want my latest CV, leave your name and email first. I
              record each download privately so I can see exactly who accessed
              it, and the log stays visible only to me.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full lg:max-w-xl space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="sr-only">Name</span>
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <User size={15} className="text-cyan-300 shrink-0" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full bg-transparent outline-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400"
                  />
                </div>
              </label>

              <label className="block">
                <span className="sr-only">Email</span>
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <Mail size={15} className="text-cyan-300 shrink-0" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full bg-transparent outline-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400"
                  />
                </div>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <button
                type="submit"
                className="btn-primary justify-center sm:w-auto"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Preparing..." : "Download CV"}
                <Download size={15} />
              </button>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Private tracking uses your name, email, time, IP, and browser
                details. CV file: {personal.name}.
              </p>
            </div>

            {message && (
              <p
                className={`text-sm ${
                  status === "success"
                    ? "text-emerald-400"
                    : "text-rose-400"
                }`}
              >
                <ShieldCheck size={14} className="inline-block mr-1 align-[-2px]" />
                {message}
              </p>
            )}
          </form>
        </div>
      </InteractivePanel>
    </ScrollReveal>
  );
}
