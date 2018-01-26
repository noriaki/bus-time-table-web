import defaultsDeep from 'lodash.defaultsdeep';
import createLaunchButtonBaseStyles from './LaunchButton-Style';

export default (theme) => {
  const { unit } = theme.spacing;
  const styles = {
    root: {
      borderRadius: '50%',
      padding: unit,
    },
    icon: {
      marginRight: 0,
    },
    text: {
      display: 'none',
    },
  };
  return defaultsDeep(styles, createLaunchButtonBaseStyles(theme));
};
