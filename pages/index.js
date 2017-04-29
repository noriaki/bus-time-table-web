import React from 'react';
import NoSSR from 'react-no-ssr';
import Head from 'next/head';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Tabs } from 'material-ui/Tabs';
import ActionHome from 'material-ui/svg-icons/action/home';
import MapsTrain from 'material-ui/svg-icons/maps/train';

// libs
// import { flattenTimeTable } from '../libs/timeTableDataHandler';
import '../libs/TouchEvent';

// data
import {
  version as appVersion,
  description as appDescription,
  title as appTitle,
} from '../package.json';
import timeTableData from '../data/timetable.json';

// components
import TabContent from '../components/TabContent';
import AddToHomescreen from '../components/AddToHomescreen';
import UpdateDate from '../components/UpdateDate';
import AppVersion from '../components/AppVersion';
import GA from '../components/GA';

// themes
import themeOptions from '../themes/custom';

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

const IndexPage = ({ userAgent, baseURI }) => (
  <MuiThemeProvider muiTheme={getMuiTheme({ ...themeOptions, userAgent })}>
    <main>
      <Head>
        <title>{appTitle}</title>
        <meta name="description" content={appDescription} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="バス時刻表" />
        <link rel="apple-touch-icon-precomposed" href="/static/icons/app.png" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${baseURI}/static/icons/app.png`} />
      </Head>
      <article style={styles.container}>
        <Tabs inkBarStyle={styles.tabInkBar} onChange={handleTabSelected}>
          {tabs.map(TabContent)}
        </Tabs>
      </article>
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <AppVersion version={appVersion} />
          <UpdateDate date={timeTableData.version} />
        </div>
        <NoSSR>
          <AddToHomescreen />
        </NoSSR>
      </footer>
      <NoSSR><GA id="UA-97608334-1" initialPageView={tabs[0]} /></NoSSR>
    </main>
  </MuiThemeProvider>
);
IndexPage.getInitialProps = async ({ req }) => (
  {
    userAgent: req ? req.headers['user-agent'] : navigator.userAgent,
    baseURI: req ? fqdn(req.headers) : fqdn(document.location),
  }
);

export default IndexPage;

const handleTabSelected = (_, __, { props: { index } }) => (
  GA.pageview(tabs[index])
);

const fqdn = ({ protocol = 'https:', host }) => `${protocol}//${host}`;

const styles = {
  container: {
    maxWidth: 800,
    margin: '0 auto',
  },
  tabInkBar: {
    height: 4,
    marginTop: -4,
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
