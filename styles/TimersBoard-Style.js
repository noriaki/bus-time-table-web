export const triangle = ({
  to = 'up', // enum('up', 'down')
  bgColor = 'transparent',
  color = '#b0b0b0',
}) => {
  let way;
  if (to === 'up') {
    way = 'to bottom';
  } else if (to === 'down') {
    way = 'to top';
  }
  return [
    `linear-gradient(${way} right, ${bgColor} 50%, ${color} 50.1%) top left / 50% 100% no-repeat`,
    `linear-gradient(${way} left, ${bgColor} 50%, ${color} 50.1%) top right / 50% 100% no-repeat`,
  ].join(', ');
};

export const container = {
  display: 'grid',
  // gridGap: '4px',
  gridTemplateColumns: '100px auto',
};

export const crossBar = {
  gridColumn: '1 / 3',
};

export const rightAside = {
  gridColumn: '2 / 3',
};

export const separatorBase = {
  // backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
};

export const leftAsideSeparator = {
  ...separatorBase,
  gridColumn: '1 / 2',
  gridRow: '2 / 5',
};

const rightSeparatorBase = {
  ...separatorBase,
  gridColumn: '2 / 3',
  minHeight: 50,
};

export const rightTopSeparator = {
  ...rightSeparatorBase,
  gridRow: '2 / 3',
};

export const rightBottomSeparator = {
  ...rightSeparatorBase,
  gridRow: '4 / 5',
};

export const upArrow = {
  width: 40,
  height: 12,
  margin: '15% auto',
  background: triangle({ to: 'up' }),
};

export const downArrow = {
  width: 40,
  height: 12,
  background: triangle({ to: 'down' }),
};

export default {
  container,
  crossBar,
  rightAside,
  leftAsideSeparator,
  rightTopSeparator,
  rightBottomSeparator,
  upArrow,
  downArrow,
};
