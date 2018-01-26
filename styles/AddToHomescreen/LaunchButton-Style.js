// animation properties
const duration = 1;
const delay = 3;
const ratio = 0.3;
const firstDuration = duration * ratio;
const secondDuration = duration * (1 - ratio);
const animationProp = (name, timing = 'ease') => (
  `${name} ${secondDuration}s ${delay + firstDuration}s ${timing} forwards`
);

export default (theme) => {
  const { unit } = theme.spacing;
  const toolbarMinHeight = theme.mixins.toolbar.minHeight;
  const secondaryColor = theme.palette.secondary;
  const baseRaisedAccent = {
    backgroundColor: secondaryColor[100],
    color: secondaryColor[900],
  };

  return ({
    root: {
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
        '@keyframes shrinkContainer': {
          from: { maxWidth: '100vw' },
          to: { maxWidth: unit * 5 },
        },
        '@keyframes roundCorner': {
          to: { borderRadius: '50%' },
        },
        '@keyframes equalPadding': {
          to: { padding: unit },
        },
        '@keyframes floatingPosition': {
          to: {
            marginRight: unit * 2,
            marginBottom: unit * 2,
          },
        },
      },
      animation: [
        animationProp('shrinkContainer'),
        animationProp('roundCorner', 'ease-in'),
        animationProp('equalPadding', 'ease-in'),
        // animationProp('floatingPosition', 'ease-in'),
      ],
    },
    raisedAccent: {
      ...baseRaisedAccent,
      '&:hover': { ...baseRaisedAccent },
    },
    icon: {
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
        `spin ${firstDuration}s ${delay}s`,
        animationProp('zeroMarginalize'),
      ],
    },
    text: {
      height: '1em',
      lineHeight: '1em',
      overflowX: 'hidden',
      '@global': {
        '@keyframes fadeOutItem': {
          to: { opacity: 0 },
        },
      },
      animation: animationProp('fadeOutItem'),
    },
  });
};
