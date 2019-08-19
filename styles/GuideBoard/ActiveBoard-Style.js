import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  content: {
    width: ({ mini }) => (mini ? '100%' : 'auto'),
  },
  buttonRoot: {
    height: '100%',
  },
  buttonLabel: {
    display: 'inline-flex',
    flexDirection: ({ mini }) => (mini ? 'row' : 'column'),
  },
  prevButton: {
    order: ({ mini }) => (mini ? 0 : -1),
  },
  prevIcon: {
    order: ({ mini }) => (mini ? -1 : 0),
  },
}, {
  name: 'ActiveBoard',
  link: true,
});

export default useStyles;
