import React, { useLayoutEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { shouldReduceMotion } from "../utils/performance";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useLayoutEffect(() => {
    const reduceMotion = shouldReduceMotion();
    if (reduceMotion) {
      return;
    }

    // Avoid double instantiation in strict mode
    if (lenisRef.current) return;

    const lenis = new Lenis({
      duration: 0.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: false,
      // increase wheel multiplier for a faster, more direct feeling
      wheelMultiplier: 1.6,
      touchMultiplier: 1.2,
      prevent: (node) => {
        // Prevent scroll interference if any element requires natural scrolling inside
        return node.hasAttribute("data-lenis-prevent") || node.classList.contains("lenis-prevent");
      }
    });

    lenisRef.current = lenis;
    // Expose lenis instance globally so route-level scroll resets can call it
    try {
      // prefer a namespaced property to avoid collisions
      window.__lenis = lenis;
    } catch (e) {
      // ignore in non-window environments
    }

    // Use ticker-based sync instead of event-based to prevent jitter
    const updateLenis = (time) => {
      lenis.raf(time);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(10); // Default lag smoothing for better scroll feel

    // Refresh ScrollTrigger on resize with debounce
    let resizeTimeout;
    const handleRefresh = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    ScrollTrigger.refresh();
    window.addEventListener("resize", handleRefresh);

    // GSAP wheel smoothing using ScrollToPlugin.
    // We capture wheel events and animate to the target scroll position with a short duration.
    // This preserves user speed while smoothing the motion visually. Respect user pref.
    const wheelHandler = (e) => {
      if (reduceMotion) return;
      // ignore pinch/zoom gestures
      if (e.ctrlKey) return;

      e.preventDefault();

      const delta = e.deltaY;
      const target = Math.max(0, Math.min(document.documentElement.scrollHeight - window.innerHeight, window.scrollY + delta));

      // very short duration to keep responsiveness; overwrite so successive wheels follow instantly
      gsap.to(window, {
        duration: 0.22,
        scrollTo: { y: target, autoKill: false },
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    // Use non-passive so we can call preventDefault()
    window.addEventListener("wheel", wheelHandler, { passive: false });

    return () => {
      clearTimeout(resizeTimeout);
      gsap.ticker.remove(updateLenis);
      window.removeEventListener("resize", handleRefresh);
      window.removeEventListener("wheel", wheelHandler, { passive: false });
      // destroy lenis to avoid leftover rafs/listeners
      try {
        if (lenis && typeof lenis.destroy === "function") {
          lenis.destroy();
        } else if (lenis && typeof lenis.scrollTo === "function") {
          // fallback: reset position
          lenis.scrollTo(0, { immediate: true });
        }
      } catch (e) {
        // swallow any destroy errors
      }
      try {
        if (window.__lenis) delete window.__lenis;
      } catch (e) {
        /* ignore */
      }
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
