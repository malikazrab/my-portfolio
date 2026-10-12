import { useCallback, useRef } from "react";
import { shouldReduceMotion, isTouchInput } from "../utils/performance";

/**
 * Attaches magnetic-hover behaviour to a button/link.
 * Uses RAF throttling for smooth 60fps updates.
 * Returns a ref + event handlers to spread onto the element.
 *
 * @param {number} strength - Max pixel drift toward the cursor (default 8)
 */
export function useMagneticHover(strength = 8) {
  const ref = useRef(null);
  const rafRef = useRef(null);
  const reduceMotion = shouldReduceMotion();
  const isTouch = isTouchInput();

  const onMouseMove = useCallback(
    (e) => {
      if (reduceMotion || isTouch) return;
      const el = ref.current;
      if (!el) return;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = ((e.clientX - cx) / (rect.width / 2)) * strength;
        const dy = ((e.clientY - cy) / (rect.height / 2)) * strength;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
        el.style.transition = "transform 60ms linear";
      });
    },
    [reduceMotion, isTouch, strength]
  );

  const onMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    el.style.transition = "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
