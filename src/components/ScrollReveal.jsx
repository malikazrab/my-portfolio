import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { shouldReduceMotion } from "../utils/performance";

const offsets = {
  up: "translate3d(0, 14px, 0)",
  down: "translate3d(0, -14px, 0)",
  left: "translate3d(14px, 0, 0)",
  right: "translate3d(-14px, 0, 0)",
};

const mobileOffsets = {
  up: "translate3d(0, 22px, 0)",
  down: "translate3d(0, -22px, 0)",
  left: "translate3d(0, 22px, 0)",
  right: "translate3d(0, 22px, 0)",
};

function ScrollReveal({
  children,
  as: Component = "div",
  className = "",
  direction = "up",
  delay = 0,
  duration = 360,
  threshold = 0.01,
  style,
  ...props
}) {
  const elementRef = useRef(null);
  const reduceMotion = shouldReduceMotion();
  const mobileViewport = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
  const revealOffsets = mobileViewport ? mobileOffsets : offsets;
  const revealDuration = mobileViewport ? Math.max(duration, 480) : duration;
  const [visible, setVisible] = useState(
    () => reduceMotion || typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element || visible || reduceMotion) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // Preload the short animation before it becomes visible; this prevents
      // reveal work from landing in the active scroll frame.
      { threshold, rootMargin: "0px 0px 180px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [reduceMotion, threshold, visible]);

  const transitionStyle = useMemo(
    () => ({
      opacity: visible ? 1 : 0,
      transform: visible ? "translate3d(0, 0, 0)" : revealOffsets[direction] || revealOffsets.up,
      transition: reduceMotion ? "none" : `opacity ${revealDuration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${revealDuration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      // The browser promotes a layer only before the reveal and releases it
      // immediately afterwards, avoiding a layer for every card on the page.
      willChange: visible ? "auto" : "opacity, transform",
      ...style,
    }),
    [delay, direction, reduceMotion, revealDuration, revealOffsets, style, visible]
  );

  return (
    <Component ref={elementRef} className={className} style={transitionStyle} {...props}>
      {children}
    </Component>
  );
}

export default memo(ScrollReveal);
