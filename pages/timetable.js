import React from 'react';

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

const TimetablePage = () => (
  <MainLayout>
    <TableOfContents labels={labels}>
      <HomeTimeTable data={timeTableHome} />
      <HGinzaTimeTable data={timeTableHigashiGinza} />
      <ShimbashiTimeTable data={timeTableShimbashi} />
    </TableOfContents>
  </MainLayout>
);

export default withMaterialUI(TimetablePage);
