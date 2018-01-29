import { headline } from './InfoBase-Style';

export const headlineSuffix = {
  display: 'inline',
  margin: '0 .5em',
};

export const caption = {
  marginBottom: '0.5em',
};

export const cardContentRoot = {
  padding: 0,
  '&:last-child': {
    paddingBottom: 0,
  },
};

export const timetableRoot = {
  borderCollapse: 'collapse',
  borderSpacing: 0,
};

export const timetableRow = theme => ({
  height: theme.spacing.unit * 5,
  '&:nth-child(odd)': {
    backgroundColor: theme.palette.secondary[50],
  },
});

export const timetableHourColumn = (theme) => {
  const { unit } = theme.spacing;
  const { pxToRem } = theme.typography;
  return {
    fontSize: pxToRem(unit * 2),
    height: unit * 5,
    width: unit * 2,
    paddingLeft: unit,
    paddingRight: unit,
    textAlign: 'center',
    backgroundColor: theme.palette.primary[500],
    color: theme.palette.grey[100],
    fontWeight: 100,
  };
};

const minutesColumnSize = 12;

export const timetableMinutesContainer = (theme) => {
  const { unit } = theme.spacing;
  return {
    paddingLeft: unit,
    paddingRight: unit,
    height: unit * 5,
    display: 'grid',
    gridGap: `${unit / 2}px`,
    gridTemplateColumns: `repeat(${minutesColumnSize}, 1fr)`,
    '&:last-child': {
      paddingRight: unit,
    },
  };
};

export const timetableMinutesContainerEstimated = theme => ({
  backgroundColor: theme.palette.grey[200],
  color: theme.palette.grey[700],
});

export const timetableMinuteColumn = theme => ({
  fontSize: theme.spacing.unit * 3,
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
});
const minuteColumnPositions = [...new Array(minutesColumnSize)].map(
  (_, i) => ({ gridColumn: `${i + 1} / ${i + 2}` })
);

export default theme => ({
  headline: headline(theme),
  headlineSuffix,
  caption,
  cardContentRoot,
  timetableRoot,
  timetableRow: timetableRow(theme),
  timetableHourColumn: timetableHourColumn(theme),
  timetableMinutesContainer: timetableMinutesContainer(theme),
  timetableMinutesContainerEstimated: timetableMinutesContainerEstimated(theme),
  timetableMinuteColumn: timetableMinuteColumn(theme),
  ...minuteColumnPositions,
});
