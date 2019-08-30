import { makeStyles } from '@material-ui/styles';

import grey from '@material-ui/core/colors/grey';

const degree = 20;

const useStyles = makeStyles(({ spacing }) => ({
  border: {
    backgroundColor: grey[300],
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
