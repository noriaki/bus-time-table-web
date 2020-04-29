import { useState } from 'react';
import { createContainer } from 'unstated-next';

const useClock = (initialState = Date.now()) => {
  const [currentTime, setClock] = useState(initialState);
  let timer = null;

  const start = () => {
    timer = setInterval(() => {
      setClock(Date.now());
    }, 1000);
  };

  const stop = () => {
    if (timer != null) {
      clearInterval(timer);
      timer = null;
    }
    setClock(null);
  };

  return { currentTime, start, stop };
};

const Clock = createContainer(useClock);

export default Clock;
