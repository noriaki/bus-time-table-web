import { makeStyles, Theme } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';

type Props = {
  isHoliday: boolean;
};

export const useContainerStyles = makeStyles(
  ({ spacing }: Theme) => ({
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing(0.5),
    },
  }),
  {
    name: 'StationTimetables',
  }
);

export const useTabsStyles = makeStyles(
  ({ palette, spacing }: Theme) => ({
    root: {
      backgroundColor: '#eee',
      // backgroundColor: ({ isHoliday }: Props) =>
      //   lighten(isHoliday ? palette.holiday.light : palette.weekday.light, 0.5),
      borderRadius: 10,
      minHeight: 'unset',
    },
    flexContainer: {
      display: 'inline-flex',
      position: 'relative',
      zIndex: 1,
    },
    indicator: {
      top: 3,
      bottom: 3,
      right: 3,
      height: 'auto',
      background: 'none',
      '&:after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 4,
        right: 4,
        bottom: 0,
        borderRadius: 8,
        // backgroundColor: palette.common.white,
        backgroundColor: ({ isHoliday }: Props) =>
          lighten(
            isHoliday ? palette.holiday.light : palette.weekday.light,
            0.5
          ),
        boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)',
      },
    },
  }),
  { name: 'StationTimetablesTabs' }
);

export const useTabItemStyles = makeStyles(
  ({ palette, breakpoints }: Theme) => ({
    root: {
      '&:hover': {
        opacity: 1,
      },
      minHeight: 'unset',
      minWidth: 80,
      [breakpoints.up('sm')]: {
        minWidth: 80,
      },
    },
    wrapper: {
      color: palette.text.primary,
      textTransform: 'initial',
    },
    selected: {
      fontWeight: 'bold',
    },
  }),
  { name: 'StationTimetablesTabItem' }
);
