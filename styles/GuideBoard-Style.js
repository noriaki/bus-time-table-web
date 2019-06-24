import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    paddingTop: 8,
  },
  content: ({ mini }) => ({
    width: mini ? '100%' : 'auto',
  }),
  buttonRoot: {
    height: '100%',
  },
  buttonLabel: ({ mini }) => ({
    display: 'inline-flex',
    flexDirection: mini ? 'row' : 'column',
  }),
  prevButton: ({ mini }) => ({
    order: mini ? 0 : -1,
  }),
  prevIcon: ({ mini }) => ({
    order: mini ? -1 : 0,
  }),
});

export default useStyles;
