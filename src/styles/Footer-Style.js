import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    paddingBottom: 34,
  },
  copyright: {
    textAlign: 'center',
  },
  version: {
    margin: 0,
    textAlign: 'center',
    '& a:link': {
      marginLeft: '.5em',
    },
  },
}, {
  name: 'Footer',
});

export default useStyles;
