export const scaleInOut = {
  enter: {
    scale: 'var(--scale-enter)',
    y: 'var(--slide-enter))',
    opacity: 1,
    transition: {
      scale: {
        duration: 0.4,
        ease: [0.36, 0.66, 0.4, 1],
      },
      opacity: {
        duration: 0.4,
        ease: [0.36, 0.66, 0.4, 1],
      },
      y: {
        type: 'spring',
        bounce: 0,
        duration: 0.6,
      },
    },
  },
  exit: {
    scale: 'var(--scale-exit)',
    y: 'var(--slide-exit)',
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.36, 0.66, 0.4, 1],
    },
  },
};

export const fadeInOut = {
  enter: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.36, 0.66, 0.4, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.36, 0.66, 0.4, 1],
    },
  },
};
