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
        stiffness: 200,
        damping: 22,
      },
    },
  },
  exit: {
    scale: 'var(--scale-exit)',
    y: 'var(--slide-exit)',
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: [0.36, 0.66, 0.4, 1],
    },
  },
};
