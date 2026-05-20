import React, { useRef, memo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { shouldReduceMotion } from "../utils/performance";

gsap.registerPlugin(ScrollTrigger);

const directionOffsets = {
  up: { x: 0, y: 30 },
  down: { x: 0, y: -30 },
  left: { x: 35, y: 0 },
  right: { x: -35, y: 0 },
};

function ScrollReveal({
  children,
  as: Component = "div",
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.8,
  amount = 0.98, // Start scale
  ...props
}) {
  const elementRef = useRef(null);

  useGSAP(() => {
    const el = elementRef.current;
    if (!el) return;

    if (shouldReduceMotion()) {
      gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1 });
      return;
    }

    const { x, y } = directionOffsets[direction] || directionOffsets.up;

    gsap.fromTo(
      el,
      {
        opacity: 0,
        x: x,
        y: y,
        scale: amount,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: duration,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%", // Trigger when top of element is 90% down the viewport
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: elementRef, dependencies: [direction, delay, duration, amount] });

  return (
    <Component ref={elementRef} className={className} {...props}>
      {children}
    </Component>
  );
}

export default memo(ScrollReveal);
