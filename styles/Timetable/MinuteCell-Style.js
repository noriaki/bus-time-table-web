import { makeStyles } from '@material-ui/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles(({ palette }) => {
  const currentColor = lighten(palette.secondary.light, 0.5);

  const styles = {
    current: {
      backgroundColor: currentColor,
    },
  };
  const indexStyles = {};
  [...Array(12).keys()].forEach(
    (i) => {
      indexStyles[`pos${i + 1}`] = { gridColumn: `${i + 1} / auto` };
    }
  );

  return { ...indexStyles, ...styles };
}, {
  name: 'TimetableMinuteCell',
});

export default useStyles;
