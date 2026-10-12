import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Optimized mobile parallax hook with performance improvements
 * @param {number} speed - Parallax speed multiplier (0.1 = slow, 0.5 = fast)
 */
export function useMobileParallax(speed = 0.3) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  const rafId = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return undefined;

    const handleScroll = () => {
      if (rafId.current) return;

      rafId.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        // Only update if scroll changed significantly (>2px)
        if (Math.abs(currentScrollY - lastScrollY.current) < 2) {
          rafId.current = null;
          return;
        }

        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const viewportCenter = window.innerHeight / 2;
          const elementCenter = rect.top + rect.height / 2;
          const distance = viewportCenter - elementCenter;
          setOffset(distance * speed);
        }

        lastScrollY.current = currentScrollY;
        rafId.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [speed]);

  return { ref, offset };
}
