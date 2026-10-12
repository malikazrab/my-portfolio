import { useEffect, useState, useRef } from "react";

/**
 * Returns a 0–100 number representing how far the user has scrolled
 * down the page. Updates on scroll via a passive listener.
 * Uses RAF throttling for optimal performance.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    let lastProgress = 0;

    function update() {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      const newProgress = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0;

      // Only update if changed (reduces re-renders)
      if (Math.abs(newProgress - lastProgress) > 0.1) {
        lastProgress = newProgress;
        setProgress(newProgress);
      }

      rafRef.current = requestAnimationFrame(update);
    }

    rafRef.current = requestAnimationFrame(update);
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return progress;
}

/**
 * Returns scroll direction (up/down) and velocity
 */
export function useScrollDirection() {
  const [direction, setDirection] = useState("up");
  const [velocity, setVelocity] = useState(0);
  const lastScrollRef = useRef(0);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(Date.now());

  useEffect(() => {
    function update() {
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      const now = Date.now();
      const deltaTime = now - lastTimeRef.current;
      const deltaScroll = currentScroll - lastScrollRef.current;

      if (deltaTime > 0) {
        const newVelocity = deltaScroll / deltaTime;
        // Only update direction if scroll is significant
        if (Math.abs(deltaScroll) > 2) {
          setDirection(deltaScroll > 0 ? "down" : "up");
        }
        setVelocity(Math.abs(newVelocity));
      }

      lastScrollRef.current = currentScroll;
      lastTimeRef.current = now;
      rafRef.current = requestAnimationFrame(update);
    }

    rafRef.current = requestAnimationFrame(update);
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return { direction, velocity };
}

/**
 * Element visibility observer - triggers when element enters viewport
 */
export function useInView({ threshold = 0.1, rootMargin = "0px 0px -50px 0px" } = {}) {
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasBeenInView(true);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isInView, hasBeenInView };
}
