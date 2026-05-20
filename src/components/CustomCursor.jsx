import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { shouldReduceMotion } from "../utils/performance";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [text, setText] = useState("");
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024 : true
  );

  useEffect(() => {
    const checkDevice = () => {
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(isCoarse || window.innerWidth < 1024);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const disabledCursor = isMobile || shouldReduceMotion();

  useEffect(() => {
    if (disabledCursor) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(dot, { xPercent: -50, yPercent: -50 });

    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });
    const xToDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });

    const handlePointerMove = (e) => {
      if (e.pointerType === "touch") return;
      const { clientX, clientY } = e;
      xToCursor(clientX);
      yToCursor(clientY);
      xToDot(clientX);
      yToDot(clientY);
    };

    const handlePointerOver = (e) => {
      const target = e.target;
      if (!target) return;
      const interactive = target.closest("a, button, [role='button'], .btn-primary, .btn-ghost, .skill-pill, .glass-card, [data-cursor]");
      if (interactive) {
        setHovered(true);
        const dataCursor = interactive.getAttribute("data-cursor");
        setText(dataCursor || "");
      }
    };

    const handlePointerOut = (e) => {
      const target = e.target;
      if (!target) return;
      const interactive = target.closest("a, button, [role='button'], .btn-primary, .btn-ghost, .skill-pill, .glass-card, [data-cursor]");
      if (interactive) {
        setHovered(false);
        setText("");
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerover", handlePointerOver);
    window.addEventListener("pointerout", handlePointerOut);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerout", handlePointerOut);
    };
  }, [disabledCursor]);

  useEffect(() => {
    if (disabledCursor) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    if (hovered) {
      if (text) {
        gsap.to(cursor, {
          width: 76,
          height: 76,
          backgroundColor: "rgba(20, 184, 166, 0.95)",
          borderColor: "rgba(20, 184, 166, 0.95)",
          duration: 0.25,
          ease: "power2.out",
        });
        gsap.to(dot, { scale: 0, duration: 0.15 });
      } else {
        gsap.to(cursor, {
          width: 44,
          height: 44,
          scale: 1.1,
          borderColor: "rgba(20, 184, 166, 0.8)",
          backgroundColor: "rgba(20, 184, 166, 0.06)",
          duration: 0.25,
          ease: "power2.out",
        });
        gsap.to(dot, { scale: 1.4, backgroundColor: "#14b8a6", duration: 0.15 });
      }
    } else {
      gsap.to(cursor, {
        width: 28,
        height: 28,
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(20, 184, 166, 0.35)",
        duration: 0.25,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 1, backgroundColor: "#14b8a6", duration: 0.15 });
    }
  }, [disabledCursor, hovered, text]);

  if (disabledCursor) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-7 h-7 rounded-full border border-brand-500/30 pointer-events-none z-[9999] flex items-center justify-center text-[10px] font-mono font-bold text-white tracking-widest overflow-hidden pointer-events-none select-none mix-blend-difference"
      >
        {text && <span className="opacity-100 uppercase">{text}</span>}
      </div>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-brand-500 pointer-events-none z-[9999] pointer-events-none select-none mix-blend-difference"
      />
    </>
  );
}
