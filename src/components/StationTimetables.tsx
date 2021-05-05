import React, { VFC } from 'react';

// material-ui
import Typography from '@material-ui/core/Typography';

// models
import Timetable from '~/models/Timetable';

// presenters
import { pickByOperationalDay } from '~/presenters/TimetablePresenter';

// components
import TimetableComponent from '~/components/Timetable';

type Props = { station: string; timetables: Timetable[] };
type VFCwithProps = VFC<Props>;

const StationTimetables: VFCwithProps = ({ station, timetables }) => {
  const [weekdayTimetable, holidayTimetable] = pickByOperationalDay(timetables);
  return (
    <>
      <Typography variant="h5" component="h3">
        {station}
        <Typography variant="caption">発</Typography>
      </Typography>
      <TimetableComponent timetable={weekdayTimetable} />
      <TimetableComponent timetable={holidayTimetable} />
    </>
  );
};

export default StationTimetables;
