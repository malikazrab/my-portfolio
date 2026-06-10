import React, { memo } from "react";
import ScrollReveal from "./ScrollReveal";

function SectionHeader({ tag, title, subtitle, center = false }) {
  return (
    <ScrollReveal className={`mb-10 sm:mb-14 ${center ? "text-center" : ""}`} direction="up">
      {tag && (
        <div className={`mb-4 ${center ? "flex justify-center" : ""}`}>
          <span className="section-tag">{tag}</span>
        </div>
      )}
      <h2 className="section-accent font-display font-semibold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4 text-slate-900 dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed ${center ? "max-w-2xl mx-auto" : "max-w-xl"}`}>
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}

export default memo(SectionHeader);
