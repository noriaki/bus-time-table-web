const duration = 2;
const delay = 4;

export const root = (theme) => {
  const { unit } = theme.spacing;
  const toolbarMinHeight = theme.mixins.toolbar.minHeight;
  const animationName = 'shrink';
  return {
    position: 'fixed',
    right: 0,
    bottom: toolbarMinHeight,
    marginRight: unit,
    marginBottom: unit,
    minWidth: unit * 3,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    '@global': {
      [`@keyframes ${animationName}`]: {
        from: { width: '100%' },
        to: { width: unit * 7 },
      },
    },
    animation: `${animationName} ${duration}s ${delay}s ease-out forwards`,
  };
};

export const raisedAccent = (theme) => {
  const baseProps = {
    backgroundColor: theme.palette.secondary[100],
    color: theme.palette.secondary[900],
  };
  return ({
    ...baseProps,
    '&:hover': { ...baseProps },
  });
};

export const icon = (theme) => {
  const { unit } = theme.spacing;
  return {
    marginRight: unit,
    '@global': {
      '@keyframes spin': {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
      },
      '@keyframes zeroMarginalize': {
        to: { marginRight: 0 },
      },
    },
    animation: [
      `spin ${duration * 0.2}s ${delay}s`,
      `zeroMarginalize ${duration * 0.8}s ${delay + (duration * 0.2)}s ease forwards`,
    ],
  };
};

export const text = {
  height: '1em',
  lineHeight: '1em',
  overflowX: 'hidden',
};

export default theme => ({
  root: root(theme),
  raisedAccent: raisedAccent(theme),
  icon: icon(theme),
  text,
});
