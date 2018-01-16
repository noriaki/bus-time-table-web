import React from 'react';
import PropTypes from 'prop-types';

// libs
import getOriginalDisplayName from '../libs/getOriginalDisplayName';
import setComponentName from '../libs/setComponentName';
import getMobileEnv, {
  propTypes as mobilePropTypes,
} from '../libs/getMobileEnv';

// data
import timeTableHome from '../data/home-timetable.json';
import timeTableHGinza from '../data/st-higashiginza-timetable.json';
import timeTableShimbashi from '../data/st-shimbashi-timetable.json';

// components
import MainLayout from '../layouts/MainLayout';
import TableOfContents from '../components/TableOfContents';
import TimeTable from '../components/TimeTable';
import withMaterialUI from '../containers/withMaterialUI';

const HomeTimeTable = setComponentName('Home')(TimeTable);
const HGinzaTimeTable = setComponentName('HGinza')(TimeTable);
const ShimbashiTimeTable = setComponentName('Shimbashi')(TimeTable);

const labels = {
  [getOriginalDisplayName(HomeTimeTable)]: 'マンション',
  [getOriginalDisplayName(HGinzaTimeTable)]: '東銀座駅',
  [getOriginalDisplayName(ShimbashiTimeTable)]: '新橋駅',
};

const TimetablePage = ({ mobile }) => (
  <MainLayout mobile={mobile}>
    <TableOfContents labels={labels}>
      <HomeTimeTable data={timeTableHome} />
      <HGinzaTimeTable data={timeTableHGinza} />
      <ShimbashiTimeTable data={timeTableShimbashi} />
    </TableOfContents>
  </MainLayout>
);
TimetablePage.propTypes = {
  mobile: PropTypes.shape(mobilePropTypes).isRequired,
};
TimetablePage.getInitialProps = async ({ req }) => ({
  mobile: getMobileEnv(req),
});

export default withMaterialUI(TimetablePage);
