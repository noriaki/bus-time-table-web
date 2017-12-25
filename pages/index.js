import React from 'react';
import NoSSR from 'react-no-ssr';
import MobileDetect from 'mobile-detect';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';

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
import DocumentHeader from '../components/DocumentHeader';
import TimersBoard from '../components/TimersBoard';
import AppTitleBar from '../components/AppTitleBar';
import AppNavigation from '../components/AppNavigation';
import AppInformation from '../components/AppInformation';
import withMaterialUI from '../containers/withMaterialUI';
import GA from '../components/GA';
import SW from '../components/SW';

// styles
import IndexPageStyle from '../styles/IndexPage-Style';

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

const IndexPage = ({
  userAgent,
  os,
  baseURI,
  classes,
}) => (
  <div className={classes.pageContainer}>
    <DocumentHeader
      title={appTitle}
      description={appDescription}
      baseURI={baseURI} />
    <AppTitleBar title="発車タイマー" />
    <main className={classes.main}>
      <TimersBoard />
      <AppInformation />
    </main>
    <AppNavigation />
    <NoSSR>
      <GA id="UA-97608334-1" initialPageView={{ page: '/' }} />
    </NoSSR>
    <NoSSR><SW /></NoSSR>
  </div>
);
IndexPage.getInitialProps = async ({ req, pathname }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return ({
    userAgent,
    os: (new MobileDetect(userAgent)).os(),
    baseURI: req ? fqdn(req.headers) : fqdn(document.location),
    pathname,
  });
};

const enhance = compose(withMaterialUI, withStyles(IndexPageStyle));

export default enhance(IndexPage);

const fqdn = ({ protocol = 'https:', host }) => `${protocol}//${host}`;
