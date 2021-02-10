const delay = 250;
let latestTouchTap = {
  time: 0,
  target: null,
};

const isDoubleTouchTap = (event) => {
  const touchTap = {
    time: Date.now(),
    target: event.currentTarget,
  };
  const result = (
    touchTap.target === latestTouchTap.target
      && touchTap.time - latestTouchTap.time < delay
  );
  latestTouchTap = touchTap;
  return result;
};

export default isDoubleTouchTap;
