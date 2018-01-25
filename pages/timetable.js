import React from 'react';
import { compose, lifecycle } from 'recompose';

// libs
import getOriginalDisplayName from '../libs/getOriginalDisplayName';
import setComponentName from '../libs/setComponentName';
import { scrollToHash } from '../libs/scroller';

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

const enhance = compose(
  withMaterialUI,
  lifecycle({
    componentDidMount() { scrollToHash(document.location.hash.slice(1)); },
  })
);
export default enhance(TimetablePage);
