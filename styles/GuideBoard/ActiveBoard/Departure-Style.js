import { makeStyles } from '@material-ui/styles';

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
