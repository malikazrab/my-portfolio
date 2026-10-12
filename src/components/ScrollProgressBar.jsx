import React, { useRef, useEffect } from "react";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { shouldReduceMotion } from "../utils/performance";

/**
 * Fixed cyan gradient line at the very top of the viewport.
 * Uses transform: scaleX for GPU-composited animation (no layout/paint).
 */
export default function ScrollProgressBar() {
  const progress = useScrollProgress();
  const reduceMotion = shouldReduceMotion();
  const barRef = useRef(null);

  // Drive with transform instead of width — compositor-only, zero layout cost
  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.transform = `scaleX(${progress / 100})`;
    }
  }, [progress]);

  if (reduceMotion) return null;

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="scroll-progress-bar"
      style={{ width: "100%", transformOrigin: "left center", transform: "scaleX(0)" }}
    />
  );
}
