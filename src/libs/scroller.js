import { scroller, animateScroll } from 'react-scroll';

export const calcDuration = (delta) => (250 + (Math.log2(delta) * 20));

export const scrollToHashOrTop = (scrollTarget) => {
  const options = {
    duration: calcDuration,
    smooth: true,
  };
  if (scrollTarget != null && scrollTarget !== '') {
    scroller.scrollTo(scrollTarget, { ...options, offset: -64 });
  } else {
    animateScroll.scrollToTop({ ...options, duration: 400 });
  }
};

export default {
  calcDuration,
  scrollToHashOrTop,
};
