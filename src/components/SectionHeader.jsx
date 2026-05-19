import React, { memo } from "react";
import { motion } from "framer-motion";
import { easeOutExpo, revealSoft, staggerContainer, viewportOnce } from "../utils/motion";

function SectionHeader({ tag, title, subtitle, center = false }) {
  return (
    <motion.div
      variants={staggerContainer(0.02, 0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`mb-12 sm:mb-16 ${center ? "text-center" : ""}`}
    >
      {tag && (
        <motion.div variants={revealSoft} className={`mb-4 ${center ? "flex justify-center" : ""}`}>
          <span className="section-tag">{tag}</span>
        </motion.div>
      )}
      <motion.h2
        variants={revealSoft}
        className="section-accent font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl dark:text-white leading-tight mb-5"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.75, delay: 0.04, ease: easeOutExpo },
            },
          }}
          className={`text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed ${center ? "max-w-2xl mx-auto" : "max-w-xl"}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

export default memo(SectionHeader);
