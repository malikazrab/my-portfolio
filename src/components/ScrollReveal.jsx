import React, { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { easeOutExpo, viewportOnce } from "../utils/motion";

const directionOffsets = {
  up: { x: 0, y: 26 },
  down: { x: 0, y: -26 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
};

function ScrollReveal({
  children,
  as = "div",
  className,
  direction = "up",
  delay = 0,
  duration = 0.7,
  amount = 0.98,
  viewport = viewportOnce,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();
  const { x, y } = directionOffsets[direction] || directionOffsets.up;
  const Component = motion[as] || motion.div;

  return (
    <Component
      initial={prefersReducedMotion ? false : { opacity: 0, x, y, scale: amount }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={prefersReducedMotion ? undefined : viewport}
      transition={{ duration, delay, ease: easeOutExpo }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

export default memo(ScrollReveal);
