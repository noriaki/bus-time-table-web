import defaultsDeep from 'lodash.defaultsdeep';
import createLaunchButtonBaseStyles from './LaunchButton-Style';

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

  const styles = {
    root: {
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
      },
      animation: [
        animationProp('shrinkContainer'),
        animationProp('roundCorner', 'ease-in'),
        animationProp('equalPadding', 'ease-in'),
      ],
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
  };
  return defaultsDeep(styles, createLaunchButtonBaseStyles(theme));
};
