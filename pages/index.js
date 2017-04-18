import React from 'react';
import Head from 'next/head';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Tabs, Tab } from 'material-ui/Tabs';
import ActionHome from 'material-ui/svg-icons/action/home';
import MapsTrain from 'material-ui/svg-icons/maps/train';

// libs
// import { flattenTimeTable } from '../libs/timeTableDataHandler';
import '../libs/TouchEvent';

// data
import timeTableData from '../data/timetable.json';

// components
import TimeTable from '../components/TimeTable';
import UpdateDate from '../components/UpdateDate';
import BoardingTimer from '../components/BoardingTimer';
import AddToHomescreen from '../components/AddToHomescreen';

// themes
import themeOptions from '../themes/custom';

export default () => (
  <MuiThemeProvider muiTheme={getMuiTheme(themeOptions)}>
    <div>
      <Head>
        <title>
          シャトルバス時刻表・発車タイマー（ドゥ・トゥール/Deux Tours）
        </title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="バス時刻表" />
        <link rel="apple-touch-icon-precomposed" href="/static/icons/app.png" />
      </Head>
      <article style={styles.container}>
        <Tabs>
          <Tab label={makeLabel({ text: 'マンション発', C: <ActionHome /> })}>
            <section>
              <BoardingTimer data={timeTableData.homeToStation} />
            </section>
            <section>
              <TimeTable data={timeTableData.homeToStation} />
            </section>
          </Tab>
          <Tab label={makeLabel({ text: '新橋駅発', C: <MapsTrain /> })}>
            <section>
              <BoardingTimer data={timeTableData.stationToHome} />
            </section>
            <section>
              <TimeTable data={timeTableData.stationToHome} />
            </section>
          </Tab>
        </Tabs>
        <footer style={{ position: 'fixed', bottom: 0, width: '100%' }}>
          <UpdateDate date={timeTableData.version} />
          <AddToHomescreen />
        </footer>
      </article>
    </div>
  </MuiThemeProvider>
);

const makeLabel = ({ text, C, ...props }) => (
  <div>
    <span style={styles.icon}>
      <C.type {...C.props} style={styles.svg} {...props} />
    </span>
    {text}
  </div>
);

const styles = {
  container: {
    maxWidth: 800,
    margin: '0 auto',
  },
  icon: {
    display: 'inline-flex',
    alignSelf: 'center',
    position: 'relative',
    height: '1.4em',
    width: '1.4em',
    marginRight: '0.3em',
  },
  svg: {
    color: 'inherit',
    height: '1.4em',
    width: '1.4em',
    position: 'absolute',
    bottom: '-0.3em',
  },
};
