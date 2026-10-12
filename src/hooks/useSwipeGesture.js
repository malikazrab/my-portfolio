import { useRef, useState, useEffect } from 'react';

/**
 * Swipe gesture detection hook for mobile
 */
export function useSwipeGesture(threshold = 50) {
  const ref = useRef(null);
  const [swiping, setSwiping] = useState(false);
  const touchStart = useRef({ x: 0, y: 0 });
  const touchEnd = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const handleTouchStart = (e) => {
      touchStart.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      setSwiping(true);
    };

    const handleTouchMove = (e) => {
      touchEnd.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const handleTouchEnd = () => {
      const deltaX = touchEnd.current.x - touchStart.current.x;
      const deltaY = touchEnd.current.y - touchStart.current.y;

      if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
        const direction = Math.abs(deltaX) > Math.abs(deltaY)
          ? (deltaX > 0 ? 'right' : 'left')
          : (deltaY > 0 ? 'down' : 'up');

        element.dispatchEvent(new CustomEvent('swipe', {
          detail: { direction, deltaX, deltaY }
        }));
      }

      setSwiping(false);
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [threshold]);

  return { ref, swiping };
}
