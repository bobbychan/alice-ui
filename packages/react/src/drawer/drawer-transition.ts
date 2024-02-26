export const slideHorizontal = {
  enter: {
    x: 'var(--slide-enter)',
    opacity: 1,
    transition: {
      opacity: {
        duration: 0.4,
        ease: [0.36, 0.66, 0.4, 1],
      },
      x: {
        type: 'spring',
        bounce: 0,
        duration: 0.6,
      },
    },
  },
  exit: {
    x: 'var(--slide-exit)',
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.36, 0.66, 0.4, 1],
    },
  },
};

export const slideVertical = {
  enter: {
    y: 'var(--slide-enter)',
    transition: {
      y: {
        type: 'spring',
        bounce: 0,
        duration: 0.6,
      },
    },
  },
  exit: {
    y: 'var(--slide-exit)',
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
