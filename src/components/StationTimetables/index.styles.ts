import { makeStyles, Theme } from '@material-ui/core/styles';
import { fade, lighten } from '@material-ui/core/styles/colorManipulator';

type Props = {
  isHoliday: boolean;
};

const useStyles = makeStyles(
  ({ palette, spacing }: Theme) => {
    const borderColor = lighten(fade(palette.divider, 1), 0.88);

    return {
      container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
      },
      root: (props: Props) => {
        const p = props.isHoliday ? palette.holiday : palette.weekday;
        return {
          tableLayout: 'fixed',
          '& caption': {
            padding: spacing(1, 2, 0.5),
            captionSide: 'top',
            backgroundColor: p.main,
            color: p.contrastText,
          },
        };
      },
      head: (props: Props) => {
        const p = props.isHoliday ? palette.holiday : palette.weekday;
        return {
          width: '2em',
          borderRight: `solid 1px ${borderColor}`,
          backgroundColor: lighten(p.light, 0.5),
        };
      },
    };
  },
  {
    name: 'Timetable',
  }
);

export default useStyles;
