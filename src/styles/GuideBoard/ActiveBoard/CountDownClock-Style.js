import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(
  {
    time: {
      fontSize: 30,
      marginLeft: 6,
      marginRight: 2,
    },
    suffix: {
      fontSize: 12,
    },
  },
  {
    name: 'CountDownClock',
  }
);

export default useStyles;
