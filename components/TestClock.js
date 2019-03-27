import React, { useEffect } from 'react';
import moment from 'moment';

const TestClock = ({ clock }) => {
  const { now } = clock.state;
  useEffect(() => () => {
    console.log('unmounting...', clock.interval);
    clearInterval(clock.interval);
  }, []); // call when unmount

  return (
    <div>
      <p>{ moment(now).format() }</p>
      <button onClick={() => clock.start()}>(Re)Start</button>
      <button onClick={() => clock.stop()}>Stop</button>
    </div>
  );
};

export default TestClock;
