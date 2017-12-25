import React from 'react';
import MobileDetect from 'mobile-detect';

// libs
import { momentFromVersion } from '../libs/timeTableDataHandler';

// data
import {
  version as appVersion,
  description as appDescription,
  title as appTitle,
} from '../package.json';
import timeTableHome from '../data/home-timetable.json';
import timeTableHigashiGinza from '../data/st-higashiginza-timetable.json';
import timeTableShimbashi from '../data/st-shimbashi-timetable.json';

// components
import MainLayout from '../layouts/MainLayout';
import AppInformation from '../components/AppInformation';
import withMaterialUI from '../containers/withMaterialUI';

const appInformation = {
  timeTableVersions: {
    home: momentFromVersion(timeTableHome.version).format('YYYY/MM/DD'),
    higashiGinza: momentFromVersion(timeTableHigashiGinza.version).format('YYYY/MM/DD'),
    shimbashi: momentFromVersion(timeTableShimbashi.version).format('YYYY/MM/DD'),
  },
  appVersion,
  appTitle,
  appDescription,
};

const TimetablePage = () => (
  <MainLayout>
    <AppInformation />
  </MainLayout>
);
TimetablePage.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return ({
    userAgent,
    os: (new MobileDetect(userAgent)).os(),
  });
};

export default withMaterialUI(TimetablePage);
