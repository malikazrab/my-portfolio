export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const prefersReducedData = () =>
  typeof navigator !== "undefined" && navigator.connection?.saveData === true;

export const isTouchInput = () =>
  typeof window !== "undefined" &&
  (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024);

export const isLowMemoryDevice = () =>
  typeof navigator !== "undefined" &&
  typeof navigator.deviceMemory === "number" &&
  navigator.deviceMemory <= 2;

export const shouldReduceMotion = () =>
  prefersReducedMotion() || prefersReducedData() || isTouchInput() || isLowMemoryDevice();
