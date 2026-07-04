const safeMatchMedia = (query) =>
  typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia(query).matches
    : false;

export const prefersReducedMotion = () => safeMatchMedia("(prefers-reduced-motion: reduce)");

export const prefersReducedData = () =>
  typeof navigator !== "undefined" && navigator.connection?.saveData === true;

export const isTouchInput = () =>
  safeMatchMedia("(pointer: coarse)") || (typeof window !== "undefined" && window.innerWidth < 1024);

export const isLowMemoryDevice = () =>
  typeof navigator !== "undefined" &&
  typeof navigator.deviceMemory === "number" &&
  navigator.deviceMemory <= 2;

export const shouldReduceMotion = () =>
  prefersReducedMotion() || prefersReducedData() || isLowMemoryDevice();

export const shouldUseLiteMode = () =>
  shouldReduceMotion() || isTouchInput();
