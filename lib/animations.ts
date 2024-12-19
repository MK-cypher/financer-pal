export const opacityAnimation = (delay = 0, duration = 2) => {
  return {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      transition: {duration, delay},
      y: 0,
    },
  };
};

export const heroScaleAnimation = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {duration: 1},
  },
};
