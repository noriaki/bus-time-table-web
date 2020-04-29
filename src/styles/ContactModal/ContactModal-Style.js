import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(({ spacing, shape }) => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    height: '90vh',
    width: '96vw',
    left: 'auto',
    right: 'auto',
    padding: 0,
    borderRadius: [
      shape.borderRadius * 2, shape.borderRadius * 2, 0, 0,
    ].map((u) => `${u}px`).join(' '),
  },
  container: {
    position: 'relative',
    height: '100%',
  },
  form: {
    width: '100%',
    height: `calc(100% - ${spacing(4)}px)`,
  },
}));

export default useStyles;
