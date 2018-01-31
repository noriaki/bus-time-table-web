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

const HomeTimeTable = setComponentName(timeTableHome.id)(TimeTable);
const HGinzaTimeTable = setComponentName(timeTableHigashiGinza.id)(TimeTable);
const ShimbashiTimeTable = setComponentName(timeTableShimbashi.id)(TimeTable);

const labels = {
  [getOriginalDisplayName(HomeTimeTable)]: 'マンション',
  [getOriginalDisplayName(HGinzaTimeTable)]: '東銀座駅',
  [getOriginalDisplayName(ShimbashiTimeTable)]: '新橋駅',
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
          <HomeTimeTable data={timeTableHome} />
        </HomeTimer>
        <HigashiGinzaTimer
          timetable={timeTableHigashiGinza.timetable}
          activeDays={timeTableHigashiGinza.activeDays}>
          <HGinzaTimeTable data={timeTableHigashiGinza} />
        </HigashiGinzaTimer>
        <ShimbashiTimer
          timetable={timeTableShimbashi.timetable}
          activeDays={timeTableShimbashi.activeDays}>
          <ShimbashiTimeTable data={timeTableShimbashi} />
        </ShimbashiTimer>
      </TableOfContents>
    </MainLayout>
  );
};

export default withMaterialUI(TimetablePage);
