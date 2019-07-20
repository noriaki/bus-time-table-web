import { makeStyles } from '@material-ui/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles(theme => ({
  root: ({ index, current }) => ({
    gridColumn: index + 1,
    backgroundColor: current && lighten(theme.palette.secondary.light, 0.5),
  }),
}));

export default useStyles;
