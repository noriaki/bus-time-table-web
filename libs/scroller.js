import { scroller } from 'react-scroll';

export const calcDuration = delta => (250 + (Math.log2(delta) * 20));

export const scrollToHash = (hash) => {
  if (hash !== '') {
    scroller.scrollTo(hash, {
      offset: -64,
      duration: calcDuration,
      smooth: true,
    });
  }
};

export default {
  calcDuration,
  scrollToHash,
};
