import { useEffect, useRef, useState } from "react";
import { shouldReduceMotion } from "../utils/performance";

/**
 * Cycles through an array of strings with a typewriter effect.
 * Returns the currently displayed string fragment.
 *
 * @param {string[]} phrases  - Array of strings to cycle through
 * @param {number}   typeSpeed  - ms per character when typing
 * @param {number}   deleteSpeed - ms per character when deleting
 * @param {number}   pauseAfter - ms to pause at the end of a fully typed phrase
 */
export function useTypewriter(phrases, typeSpeed = 60, deleteSpeed = 35, pauseAfter = 1800) {
  const reduceMotion = shouldReduceMotion();
  const [displayed, setDisplayed] = useState(phrases[0] ?? "");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(phrases[0]?.length ?? 0);
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // If reduced motion, just show the first phrase statically.
    if (reduceMotion || phrases.length <= 1) {
      setDisplayed(phrases[0] ?? "");
      return;
    }

    function tick() {
      const current = phrases[phraseIdx];

      if (!deleting) {
        if (charIdx < current.length) {
          setCharIdx((c) => c + 1);
          setDisplayed(current.slice(0, charIdx + 1));
          timeoutRef.current = setTimeout(tick, typeSpeed);
        } else {
          // Finished typing — pause then start deleting
          timeoutRef.current = setTimeout(() => {
            setDeleting(true);
            tick();
          }, pauseAfter);
        }
      } else {
        if (charIdx > 0) {
          setCharIdx((c) => c - 1);
          setDisplayed(current.slice(0, charIdx - 1));
          timeoutRef.current = setTimeout(tick, deleteSpeed);
        } else {
          // Finished deleting — move to next phrase
          const next = (phraseIdx + 1) % phrases.length;
          setPhraseIdx(next);
          setCharIdx(0);
          setDeleting(false);
          setDisplayed("");
          timeoutRef.current = setTimeout(tick, typeSpeed * 2);
        }
      }
    }

    timeoutRef.current = setTimeout(tick, typeSpeed);
    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIdx, deleting, phraseIdx, phrases, reduceMotion]);

  return displayed;
}
