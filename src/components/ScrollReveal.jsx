import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { shouldUseLiteMode } from "../utils/performance";

const directionOffsets = {
  up: "translate3d(0, 18px, 0) scale(0.985)",
  down: "translate3d(0, -18px, 0) scale(0.985)",
  left: "translate3d(18px, 0, 0) scale(0.985)",
  right: "translate3d(-18px, 0, 0) scale(0.985)",
};

function ScrollReveal({
  children,
  as: Component = "div",
  className = "",
  direction = "up",
  delay = 0,
  duration = 760,
  threshold = 0.14,
  style,
  ...props
}) {
  const elementRef = useRef(null);
  const liteMode = shouldUseLiteMode();
  const [visible, setVisible] = useState(() => liteMode);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || visible) return undefined;

    if (liteMode) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [liteMode, threshold, visible]);

  const transitionStyle = useMemo(
    () => ({
      opacity: visible ? 1 : 0,
      transform: visible ? "translate3d(0, 0, 0) scale(1)" : directionOffsets[direction] || directionOffsets.up,
      transitionProperty: "opacity, transform",
      transitionDuration: liteMode ? "1ms" : `${duration}ms`,
      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      transitionDelay: `${delay}ms`,
      willChange: liteMode ? "auto" : "opacity, transform",
      ...style,
    }),
    [delay, direction, duration, liteMode, style, visible]
  );

  return (
    <Component ref={elementRef} className={className} style={transitionStyle} {...props}>
      {children}
    </Component>
  );
}

export default memo(ScrollReveal);
