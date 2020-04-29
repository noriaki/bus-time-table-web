import { makeStyles } from '@material-ui/styles';

const degree = 20;

const useStyles = makeStyles(({ palette, spacing, shape }) => ({
  root: {
    height: spacing(4),
    position: 'sticky',
    top: 0,
    backgroundColor: palette.common.white,
    zIndex: 1,
    borderRadius: [
      shape.borderRadius * 2, shape.borderRadius * 2, 0, 0,
    ].map((u) => `${u}px`).join(' '),
  },
  border: {
    backgroundColor: palette.grey[300],
    height: spacing(0.5),
    width: spacing(2),
    borderRadius: spacing(0.25),
  },
  left: {
    transform: `rotate(${degree}deg)`,
    marginRight: spacing(-0.25),
  },
  right: {
    transform: `rotate(-${degree}deg)`,
    marginLeft: spacing(-0.25),
  },
}));

export default useStyles;
