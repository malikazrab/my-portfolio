import React, { useEffect, useRef, useState, useMemo } from 'react';

/**
 * Optimized mobile animation wrapper component with performance improvements
 * Uses IntersectionObserver for efficient viewport detection
 */
export default function MobileAnimationWrapper({
  children,
  animation = 'bounce',
  delay = 0,
  className = '',
  threshold = 0.1
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  const isMobile = useMemo(() => {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  }, []);

  useEffect(() => {
    if (!isMobile || hasAnimated) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          const timer = setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay);

          return () => clearTimeout(timer);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, isMobile, threshold, hasAnimated]);

  const animationClass = isMobile && isVisible ? `mobile-${animation}-in` : '';

  return (
    <div ref={ref} className={`${animationClass} ${className}`}>
      {children}
    </div>
  );
}
