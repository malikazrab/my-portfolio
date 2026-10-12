import { useCallback, useRef } from "react";
import { shouldReduceMotion, isTouchInput } from "../utils/performance";

/**
 * Attaches a 3-D perspective tilt to a card on mouse move.
 * Uses RAF throttling for smooth 60fps updates.
 *
 * @param {number} maxDeg  - Maximum tilt angle in degrees (default 8)
 * @param {number} scale   - Scale-up factor on hover (default 1.02)
 */
export function useTilt(maxDeg = 8, scale = 1.02) {
  const ref = useRef(null);
  const rafRef = useRef(null);
  const reduceMotion = shouldReduceMotion();
  const isTouch = isTouchInput();

  const onMouseMove = useCallback(
    (e) => {
      if (reduceMotion || isTouch) return;
      const el = ref.current;
      if (!el) return;

      // Cancel previous RAF to avoid queuing multiple frames
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const rotY = x * maxDeg * 2;
        const rotX = -y * maxDeg * 2;
        el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${scale},${scale},${scale})`;
        el.style.transition = "transform 60ms linear";
      });
    },
    [reduceMotion, isTouch, maxDeg, scale]
  );

  const onMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    el.style.transition = "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
