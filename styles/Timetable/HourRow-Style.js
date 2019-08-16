import { makeStyles } from '@material-ui/styles';
import { fade, lighten } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles(({ palette }) => {
  const borderColor = lighten(fade(palette.divider, 1), 0.88);

  return ({
    head: {
      width: '2em',
      borderRight: `solid 1px ${borderColor}`,
    },
    column: {
      backgroundColor: ({ estimated }) => (
        estimated ? palette.grey[200] : 'inherit'
      ),
    },
    cellContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      padding: '0 8px',
    },
  });
});

export default useStyles;
