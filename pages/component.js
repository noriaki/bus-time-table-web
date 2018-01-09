import React from 'react';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import timer from 'react-timer-hoc';

import withMaterialUI from '../containers/withMaterialUI';
import RemainingTimer from '../containers/RemainingTimer';

import timeTableHome from '../data/home-timetable.json';
import timeTableHigashiGinza from '../data/st-higashiginza-timetable.json';
import timeTableShimbashi from '../data/st-shimbashi-timetable.json';

import GuideBoard from '../components/GuideBoard';
import TimersBoardStyle from '../styles/TimersBoard-Style';

const CurrentTimer = timer(1000)(RemainingTimer);

const ComponentPage = ({ classes }) => (
  <main className={classes.main}>
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
  </main>
);

const enhance = compose(withMaterialUI, withStyles(TimersBoardStyle));

export default enhance(ComponentPage);
