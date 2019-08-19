import { makeStyles } from '@material-ui/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles(({ palette }) => {
  const currentColor = lighten(palette.secondary.light, 0.5);

  return {
    root: {
      gridColumn: ({ index }) => index + 1,
      backgroundColor: ({ current }) => current && currentColor,
    },
  };
}, {
  name: 'TimetableMinuteCell',
  link: true,
});

export default useStyles;
