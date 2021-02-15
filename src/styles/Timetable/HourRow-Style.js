import { makeStyles } from '@material-ui/styles';
import { fade, lighten } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles(
  ({ palette }) => {
    const borderColor = lighten(fade(palette.divider, 1), 0.88);

    return {
      head: {
        width: '2em',
        borderRight: `solid 1px ${borderColor}`,
      },
      estimatedColumn: {
        backgroundColor: palette.grey[200],
      },
      cellContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        padding: '0 8px',
      },
    };
  },
  {
    name: 'TimetableHourRow',
  }
);

export default useStyles;
