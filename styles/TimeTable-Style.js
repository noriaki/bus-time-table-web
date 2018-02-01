import { lighten } from 'material-ui/styles/colorManipulator';

import { headline } from './InfoBase-Style';

export default (theme) => {
  const { unit } = theme.spacing;
  const space = unit / 2;
  const { pxToRem } = theme.typography;
  const minutesColumnSize = 12;

  const minuteColumnPositions = [...new Array(minutesColumnSize)].map(
    (_, i) => ({ gridColumn: `${i + 1} / ${i + 2}` })
  );

  const { primary, secondary, grey } = theme.palette;

  return {
    headlineContainer: {
      ...headline(theme),
      marginBottom: 0,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    headline: headline(theme),

    headlineSuffix: {
      display: 'inline',
      margin: '0 .5em',
    },

    buttonIcon: { marginLeft: space },

    cardContentRoot: {
      padding: 0,
      '&:last-child': {
        paddingBottom: 0,
      },
    },

    timetableRoot: {
      borderCollapse: 'collapse',
      borderSpacing: 0,
    },

    timetableRow: {
      height: unit * 5,
      '&:nth-child(odd)': { backgroundColor: lighten(secondary.main, 0.88) },
    },

    timetableHourColumn: {
      fontSize: pxToRem(unit * 2),
      height: unit * 5,
      width: unit * 2,
      paddingLeft: unit,
      paddingRight: unit,
      textAlign: 'center',
      backgroundColor: primary.main,
      color: grey[100],
      fontWeight: 100,
    },

    timetableMinutesContainer: {
      paddingLeft: unit,
      paddingRight: unit,
      height: unit * 5,
      display: 'grid',
      gridGap: `${space}px`,
      gridTemplateColumns: `repeat(${minutesColumnSize}, 1fr)`,
      '&:last-child': {
        paddingRight: unit,
      },
    },

    timetableMinutesContainerEstimated: {
      backgroundColor: grey[200],
      color: grey[700],
    },

    timetableMinuteColumn: {
      fontSize: unit * 3,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    ...minuteColumnPositions,

    currentTimeMinuteColumn: {
      backgroundColor: lighten(secondary.main, 0.5),
      color: grey[100],
      fontWeight: 'lighter',
      paddingLeft: space,
      paddingRight: space,
      marginLeft: space * -1,
    },

    updatedAt: { marginTop: unit },
  };
};
