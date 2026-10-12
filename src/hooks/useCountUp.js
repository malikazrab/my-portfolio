import { useEffect, useRef, useState } from "react";
import { shouldReduceMotion } from "../utils/performance";

/**
 * Animates a number from 0 to `target` once the element enters the viewport.
 *
 * @param {number} target    - Final value
 * @param {number} duration  - Animation duration in ms
 * @returns {{ ref, value }} - Attach ref to the element; display `value`
 */
export function useCountUp(target, duration = 1200) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const reduceMotion = shouldReduceMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduceMotion) {
      setValue(target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        function frame(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, reduceMotion]);

  return { ref, value };
}
