import { makeStyles } from '@material-ui/styles';

// material-ui colors
import red from '@material-ui/core/colors/red';

const useStyles = makeStyles({
  root: {},
  departure: {
    fontSize: 14,
  },
  time: {
    fontWeight: 'bold',
    margin: '0 4px',
  },
  suffix: {
    fontSize: 12,
  },
});

export default useStyles;

export const useLastBadgeStyles = makeStyles({
  badge: {
    right: 'unset',
    left: '-4px',
    fontSize: 10,
    width: '3em',
    backgroundColor: red[50],
    color: red[500],
  },
});
