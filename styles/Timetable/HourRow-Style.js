import { makeStyles } from '@material-ui/styles';
import { fade, lighten } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles(theme => ({
  head: {
    width: '2em',
    borderRight: `solid 1px ${lighten(fade(theme.palette.divider, 1), 0.88)}`,
  },
  column: ({ estimated }) => (estimated ? {
    backgroundColor: theme.palette.grey[200],
  } : {}),
  cellContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    padding: '0 8px',
  },
}));

export default useStyles;
