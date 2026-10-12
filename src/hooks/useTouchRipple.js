import { useRef, useCallback } from 'react';

/**
 * Optimized touch ripple effect hook with performance improvements
 */
export function useTouchRipple() {
  const ref = useRef(null);
  const rippleTimeout = useRef(null);

  const createRipple = useCallback((e) => {
    const element = ref.current;
    if (!element) return;

    // Prevent multiple ripples at once
    if (rippleTimeout.current) return;

    const rect = element.getBoundingClientRect();
    const isTouchEvent = e.touches !== undefined;
    const clientX = isTouchEvent ? e.touches[0].clientX : e.clientX;
    const clientY = isTouchEvent ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.className = 'touch-ripple-effect';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    element.appendChild(ripple);

    rippleTimeout.current = setTimeout(() => {
      ripple.remove();
      rippleTimeout.current = null;
    }, 600);
  }, []);

  const onTouchStart = useCallback((e) => {
    createRipple(e);
  }, [createRipple]);

  return { ref, onTouchStart };
}
