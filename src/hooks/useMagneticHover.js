import { useCallback, useRef } from "react";
import { shouldReduceMotion, isTouchInput } from "../utils/performance";

/**
 * Attaches magnetic-hover behaviour to a button/link.
 * Returns a ref to attach to the element.
 *
 * On mousemove the element drifts toward the cursor (max ±strength px).
 * On mouseleave it springs back to origin.
 */
export function useMagneticHover(strength = 8) {
  const ref = useRef(null);
  const reduceMotion = shouldReduceMotion();
  const isTouch = isTouchInput();

  const onMouseMove = useCallback(
    (e) => {
      if (reduceMotion || isTouch) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = ((e.clientX - cx) / (rect.width / 2)) * strength;
      const dy = ((e.clientY - cy) / (rect.height / 2)) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      el.style.transition = "transform 80ms linear";
    },
    [reduceMotion, isTouch, strength]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    el.style.transition = "transform 320ms cubic-bezier(0.16, 1, 0.3, 1)";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
