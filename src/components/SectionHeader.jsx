import React from "react";
import { motion } from "framer-motion";

export default function SectionHeader({ tag, title, subtitle, center = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`mb-12 sm:mb-16 ${center ? "text-center" : ""}`}
    >
      {tag && (
        <div className={`mb-4 ${center ? "flex justify-center" : ""}`}>
          <span className="section-tag">{tag}</span>
        </div>
      )}
      <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl dark:text-white leading-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed ${center ? "max-w-2xl mx-auto" : "max-w-xl"}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
