import { makeStyles } from '@material-ui/styles';

// material-ui colors
import red from '@material-ui/core/colors/red';

const useStyles = makeStyles({
  badge: {
    right: 'unset',
    left: '-4px',
    fontSize: 10,
    width: '3em',
    backgroundColor: red[50],
    color: red[500],
  },
});

export default useStyles;
