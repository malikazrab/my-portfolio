import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { shouldReduceMotion } from "../utils/performance";

export default function Magnetic({ children, range = 30, speed = 0.8, tolerance = 1.0 }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el || shouldReduceMotion()) return;

    // quickTo is highly optimized for frequent updates (like mouse moves)
    const xTo = gsap.quickTo(el, "x", { duration: speed, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(el, "y", { duration: speed, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      // Check if mouse is within proximity range
      const distance = Math.hypot(x, y);
      const maxDistance = Math.max(width, height) * tolerance + range;

      if (distance < maxDistance) {
        // Move element toward cursor with a dampening factor
        xTo(x * 0.4);
        yTo(y * 0.4);
      } else {
        // Return to origin
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: containerRef });

  // Use a span inline-flex or inline-block so it wraps elements correctly without changing layout
  return (
    <span ref={containerRef} className="inline-flex items-center justify-center">
      {children}
    </span>
  );
}
