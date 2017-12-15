import React from 'react';
import NoSSR from 'react-no-ssr';
import Head from 'next/head';
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
import TimersBoard from '../components/TimersBoard';
import withMaterialUI from '../containers/withMaterialUI';
import IndexPageStyle from '../styles/IndexPage-Style';
import GA from '../components/GA';
import SW from '../components/SW';

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
    <h1>発車タイマー</h1>
    <TimersBoard />
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

const enhance = compose(withMaterialUI, withStyles(IndexPageStyle));

export default enhance(IndexPage);

const fqdn = ({ protocol = 'https:', host }) => `${protocol}//${host}`;
