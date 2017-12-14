import React from 'react';
import NoSSR from 'react-no-ssr';
import Head from 'next/head';
import MobileDetect from 'mobile-detect';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import timer from 'react-timer-hoc';

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
import withMaterialUI from '../containers/withMaterialUI';
import RemainingTimer from '../containers/RemainingTimer';
import GuideBoard from '../components/GuideBoard';
import TimersBoardStyle from '../styles/TimersBoard-Style';
import GA from '../components/GA';
import SW from '../components/SW';

const CurrentTimer = timer(1000)(RemainingTimer);

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
  <main className={classes.main}>
    <Head>
      <meta charSet="utf-8" />
      <title>{appTitle}</title>
      <meta name="description" content={appDescription} />
      <meta name="mobile-web-app-capable" content="yes" />
      <link rel="manifest" href="/static/manifest.json" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="バス時刻表" />
      <link rel="apple-touch-icon-precomposed" href="/static/icons/app.png" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${baseURI}/static/icons/app.png`} />
    </Head>
    <h1>component</h1>
    <div className={classes.container}>
      <div className={classes.crossBar}>
        <CurrentTimer timetable={timeTableHome.timetable}>
          <GuideBoard departure={timeTableHome.name} />
        </CurrentTimer>
      </div>
      <div className={classes.rightAside}>
        <CurrentTimer timetable={timeTableHigashiGinza.timetable}>
          <GuideBoard vertically departure={timeTableHigashiGinza.name} />
        </CurrentTimer>
      </div>
      <div className={classes.crossBar}>
        <CurrentTimer timetable={timeTableShimbashi.timetable}>
          <GuideBoard departure={timeTableShimbashi.name} />
        </CurrentTimer>
      </div>
      <div className={classes.leftAsideSeparator}>
        <div className={classes.upArrow} />
        <div className={classes.upArrow} />
        <div className={classes.upArrow} />
      </div>
      <div className={classes.rightTopSeparator}>
        <div className={classes.downArrow} />
      </div>
      <div className={classes.rightBottomSeparator}>
        <div className={classes.downArrow} />
      </div>
    </div>
    <NoSSR>
      <GA id="UA-97608334-1" initialPageView={{ page: '/' }} />
    </NoSSR>
    <NoSSR><SW /></NoSSR>
  </main>
);
IndexPage.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return ({
    userAgent,
    os: (new MobileDetect(userAgent)).os(),
    baseURI: req ? fqdn(req.headers) : fqdn(document.location),
  });
};

const enhance = compose(withMaterialUI, withStyles(TimersBoardStyle));

export default enhance(IndexPage);

const fqdn = ({ protocol = 'https:', host }) => `${protocol}//${host}`;
