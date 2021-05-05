import React, { ChangeEvent, useState, VFC } from 'react';

// material-ui
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

// models
import Timetable from '~/models/Timetable';

// presenters
import { pickByOperationalDay } from '~/presenters/TimetablePresenter';

// components
import TimetableComponent from '~/components/Timetable';

// containers
import Clock from '~/containers/ClockContainer';

type Props = { station: string; timetables: Timetable[] };
type VFCwithProps = VFC<Props>;

const StationTimetables: VFCwithProps = ({ station, timetables }) => {
  const [weekdayTimetable, holidayTimetable] = pickByOperationalDay(timetables);
  const { currentTime } = Clock.useContainer();
  const selectedTimetable = [weekdayTimetable, holidayTimetable].find((t) =>
    t.isInServiceDay(currentTime)
  );

  const [value, setValue] = useState(selectedTimetable?.id);
  const handleChange = (
    _: ChangeEvent<Record<string, never>>,
    newValue: string
  ) => {
    setValue(newValue);
  };

  return (
    <article>
      <div>
        <Typography variant="h5" component="h3">
          {station}
          <Typography variant="caption">発</Typography>
        </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label={`${station}'s Weekday and Holiday Timetable`}
        >
          <Tab label={weekdayTimetable.label} value={weekdayTimetable.id} />
          <Tab label={holidayTimetable.label} value={holidayTimetable.id} />
        </Tabs>
      </div>
      <div hidden={value !== weekdayTimetable.id}>
        <TimetableComponent timetable={weekdayTimetable} />
      </div>
      <div hidden={value !== holidayTimetable.id}>
        <TimetableComponent timetable={holidayTimetable} />
      </div>
    </article>
  );
};

export default StationTimetables;
