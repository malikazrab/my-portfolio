import React, { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";

function InteractivePanel({
  children,
  className = "",
  innerClassName = "",
  hover = true,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      whileHover={hover && !prefersReducedMotion ? { y: -6, scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 220, damping: 24, mass: 0.65 }}
      style={{ willChange: "transform" }}
      {...props}
    >
      <div className={innerClassName}>{children}</div>
    </motion.div>
  );
}

export default memo(InteractivePanel);
