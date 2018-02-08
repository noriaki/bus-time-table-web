import React from 'react';
import timer from 'react-timer-hoc';

// libs
import getOriginalDisplayName from '../libs/getOriginalDisplayName';
import setComponentName from '../libs/setComponentName';

// data
import timeTableHome from '../data/home-timetable.json';
import timeTableHigashiGinza from '../data/st-higashiginza-timetable.json';
import timeTableShimbashi from '../data/st-shimbashi-timetable.json';

// components
import MainLayout from '../layouts/MainLayout';
import TableOfContents from '../components/TableOfContents';
import RemainingTimer from '../containers/RemainingTimer';
import TimeTable from '../components/TimeTable';
import withMaterialUI from '../containers/withMaterialUI';

const labels = {
  [timeTableHome.id]: 'マンション',
  [timeTableHigashiGinza.id]: '東銀座駅',
  [timeTableShimbashi.id]: '新橋駅',
};

const TimetablePage = () => {
  const delay = 60 * 1000;
  const CurrentTimer = timer(delay)(RemainingTimer);
  const HomeTimer = setComponentName(timeTableHome.id)(CurrentTimer);
  const HigashiGinzaTimer = setComponentName(timeTableHigashiGinza.id)(CurrentTimer);
  const ShimbashiTimer = setComponentName(timeTableShimbashi.id)(CurrentTimer);
  return (
    <MainLayout>
      <TableOfContents labels={labels}>
        <HomeTimer
          timetable={timeTableHome.timetable}
          activeDays={timeTableHome.activeDays}>
          <TimeTable data={timeTableHome} />
        </HomeTimer>
        <HigashiGinzaTimer
          timetable={timeTableHigashiGinza.timetable}
          activeDays={timeTableHigashiGinza.activeDays}>
          <TimeTable data={timeTableHigashiGinza} />
        </HigashiGinzaTimer>
        <ShimbashiTimer
          timetable={timeTableShimbashi.timetable}
          activeDays={timeTableShimbashi.activeDays}>
          <TimeTable data={timeTableShimbashi} />
        </ShimbashiTimer>
      </TableOfContents>
    </MainLayout>
  );
};

export default withMaterialUI(TimetablePage);
