import React from 'react';
import NoSSR from 'react-no-ssr';
import moment from 'moment';
import MobileDetect from 'mobile-detect';
import Head from 'next/head';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ActionHome from 'material-ui/svg-icons/action/home';
import MapsTrain from 'material-ui/svg-icons/maps/train';

// libs
import { momentFromVersion } from '../libs/timeTableDataHandler';
import '../libs/TouchEvent';

// data
import {
  version as appVersion,
  description as appDescription,
  title as appTitle,
} from '../package.json';
import timeTableData from '../data/timetable.json';

// components
import TabbedTimeTable from '../components/TabbedTimeTable';
import AppNavigation from '../components/AppNavigation';
import GA from '../components/GA';

// themes
import themeOptions from '../themes/custom';

const appInformation = {
  timeTableVersion: (
    momentFromVersion(timeTableData.version).format('YYYY/MM/DD')
  ),
  appVersion,
};

const tabs = [{
  title: 'マンション発タブ',
  page: '/tabs/home-to-station',
  label: 'マンション発',
  dest: '新橋駅',
  C: <ActionHome />,
  data: timeTableData.homeToStation,
}, {
  title: '新橋駅発タブ',
  page: '/tabs/station-to-home',
  label: '新橋駅発',
  dest: 'マンション',
  C: <MapsTrain />,
  data: timeTableData.stationToHome,
}];

const IndexPage = ({ userAgent, os, baseURI, tabIndex }) => (
  <MuiThemeProvider muiTheme={getMuiTheme({ ...themeOptions, userAgent })}>
    <main>
      <Head>
        <meta charSet="utf-8" />
        <title>{appTitle}</title>
        <meta name="description" content={appDescription} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="バス時刻表" />
        <link rel="apple-touch-icon-precomposed" href="/static/icons/app.png" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${baseURI}/static/icons/app.png`} />
      </Head>
      <article style={styles.container}>
        <TabbedTimeTable tabs={tabs} index={tabIndex} />
      </article>
      <footer style={styles.footer}>
        <AppNavigation info={appInformation} os={os} />
      </footer>
      <NoSSR>
        <GA id="UA-97608334-1" initialPageView={tabs[tabIndex]} />
      </NoSSR>
    </main>
  </MuiThemeProvider>
);
IndexPage.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return ({
    userAgent,
    os: (new MobileDetect(userAgent)).os(),
    baseURI: req ? fqdn(req.headers) : fqdn(document.location),
    tabIndex: detectTabIndex(),
  });
};

export default IndexPage;

const fqdn = ({ protocol = 'https:', host }) => `${protocol}//${host}`;

const detectTabIndex = (currentTime = moment()) => {
  const oClock = currentTime.hours();
  if (oClock >= 4 && oClock < 14) { return 0; }
  return 1;
};

const styles = {
  container: {
    maxWidth: 800,
    margin: '0 auto',
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};
