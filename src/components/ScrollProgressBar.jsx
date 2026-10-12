import React from "react";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { shouldReduceMotion } from "../utils/performance";

/**
 * Fixed cyan gradient line at the very top of the viewport.
 * Fills left-to-right as the user scrolls down the page.
 * Hidden on the loader overlay and respects prefers-reduced-motion.
 */
export default function ScrollProgressBar() {
  const progress = useScrollProgress();
  const reduceMotion = shouldReduceMotion();

  if (reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="scroll-progress-bar"
      style={{ width: `${progress}%` }}
    />
  );
}
