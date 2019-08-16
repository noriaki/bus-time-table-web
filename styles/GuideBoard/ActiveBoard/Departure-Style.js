import { makeStyles } from '@material-ui/styles';

// material-ui colors
import red from '@material-ui/core/colors/red';

// common styles
import departureStyles from '../commons/departure';

const useStyles = makeStyles({
  ...departureStyles,
  time: {
    fontWeight: 'bold',
    margin: '0 4px',
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
