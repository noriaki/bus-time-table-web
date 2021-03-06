import React, { ChangeEvent, useEffect, useState, VFC } from 'react';

// material-ui
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// models
import Timetable from '~/models/Timetable';

// presenters
import { pickByOperationalDay } from '~/presenters/TimetablePresenter';

// components
import TimetableComponent from '~/components/Timetable';

// styles
import {
  useContainerStyles,
  useTabItemStyles,
  useTabsStyles,
} from './index.styles';

type Props = { station: string; timetables: Timetable[] };
type VFCwithProps = VFC<Props>;

const StationTimetables: VFCwithProps = ({ station, timetables }) => {
  const [weekdayTimetable, holidayTimetable] = pickByOperationalDay(timetables);

  const [value, setValue] = useState(weekdayTimetable.id); // default weekday
  const handleChange = (
    _: ChangeEvent<Record<string, never>>,
    newValue: string
  ) => {
    setValue(newValue);
  };

  useEffect(() => {
    // change timetable by client local-time
    const currentTime = Date.now();
    const currentTimetable = [weekdayTimetable, holidayTimetable].find((t) =>
      t.isInServiceDay(currentTime)
    );
    if (currentTimetable != null) {
      setValue(currentTimetable.id);
    }
  }, [weekdayTimetable, holidayTimetable]);

  // change styles based on selected timetable
  const isHoliday = !![weekdayTimetable, holidayTimetable].find(
    ({ id }) => id === value
  )?.isActiveOnHoliday;

  const containerClasses = useContainerStyles();
  const tabsClasses = useTabsStyles({ isHoliday });
  const tabItemClasses = useTabItemStyles();

  return (
    <Paper
      component="article"
      elevation={0}
      className={containerClasses.container}
    >
      <div className={containerClasses.header}>
        <Typography variant="h5" component="h3">
          {station}
          <Typography variant="caption">発</Typography>
        </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          classes={tabsClasses}
          aria-label={`${station}'s Weekday and Holiday Timetable`}
        >
          <Tab
            label={weekdayTimetable.label}
            value={weekdayTimetable.id}
            disableRipple
            classes={tabItemClasses}
          />
          <Tab
            label={holidayTimetable.label}
            value={holidayTimetable.id}
            disableRipple
            classes={tabItemClasses}
          />
        </Tabs>
      </div>
      <div hidden={value !== weekdayTimetable.id}>
        <TimetableComponent timetable={weekdayTimetable} />
      </div>
      <div hidden={value !== holidayTimetable.id}>
        <TimetableComponent timetable={holidayTimetable} />
      </div>
    </Paper>
  );
};

export default StationTimetables;
