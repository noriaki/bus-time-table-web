import React from 'react';

// material-ui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// containers
import {
  HomeTimetableHook,
  HomeTimetable,
  HigashiGinzaTimetableHook,
  HigashiGinzaTimetable,
  ShimbashiTimetableHook,
  ShimbashiTimetable,
} from '~/containers/TimetableContainer';

// components
import Timetable from './Timetable';

const Timetables = ({ clock }) => {
  const { currentTime } = clock;
  const homeState = HomeTimetableHook.buildState(currentTime)();
  const higashiGinzaState = HigashiGinzaTimetableHook.buildState(currentTime)();
  const shimbashiState = ShimbashiTimetableHook.buildState(currentTime)();

  return (
    <>
      <Typography component="h2" variant="h6">
        時刻表
      </Typography>
      <Card>
        <CardContent>
          <HomeTimetable.Provider initialState={homeState}>
            <Timetable clock={clock} TimetableContainer={HomeTimetable} />
          </HomeTimetable.Provider>
        </CardContent>
        <CardContent>
          <HigashiGinzaTimetable.Provider initialState={higashiGinzaState}>
            <Timetable
              clock={clock}
              TimetableContainer={HigashiGinzaTimetable}
            />
          </HigashiGinzaTimetable.Provider>
        </CardContent>
        <CardContent>
          <ShimbashiTimetable.Provider initialState={shimbashiState}>
            <Timetable clock={clock} TimetableContainer={ShimbashiTimetable} />
          </ShimbashiTimetable.Provider>
        </CardContent>
      </Card>
    </>
  );
};

export default Timetables;
