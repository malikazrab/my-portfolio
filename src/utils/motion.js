export const easeOutExpo = [0.16, 1, 0.3, 1];

export const viewportOnce = {
  once: true,
  margin: "-60px",
};

export const staggerContainer = (delayChildren = 0.08, staggerChildren = 0.1) => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren,
      staggerChildren,
    },
  },
});

export const revealUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOutExpo,
    },
  },
};

export const revealSoft = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 18,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: easeOutExpo,
    },
  },
};

export const cardHover = {
  rest: {
    y: 0,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
  },
  hover: {
    y: -10,
    scale: 1.01,
    rotateX: 1.5,
    rotateY: -1.5,
    transition: {
      duration: 0.35,
      ease: easeOutExpo,
    },
  },
};
