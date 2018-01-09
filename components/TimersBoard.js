import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import timer from 'react-timer-hoc';

// data
import timeTableHome from '../data/home-timetable.json';
import timeTableHigashiGinza from '../data/st-higashiginza-timetable.json';
import timeTableShimbashi from '../data/st-shimbashi-timetable.json';

// components
import RemainingTimer from '../containers/RemainingTimer';
import GuideBoard from '../components/GuideBoard';

// styles
import TimersBoardStyle from '../styles/TimersBoard-Style';

const TimersBoard = ({ delay, classes }) => {
  const CurrentTimer = timer(delay)(RemainingTimer);
  return (
    <div className={classes.container}>
      <div className={classes.crossBar}>
        <CurrentTimer
          timetable={timeTableHome.timetable}
          activeDays={timeTableHome.activeDays}>
          <GuideBoard departure={timeTableHome.name} />
        </CurrentTimer>
      </div>
      <div className={classes.rightAside}>
        <CurrentTimer
          timetable={timeTableHigashiGinza.timetable}
          activeDays={timeTableHigashiGinza.activeDays}>
          <GuideBoard vertically departure={timeTableHigashiGinza.name} />
        </CurrentTimer>
      </div>
      <div className={classes.crossBar}>
        <CurrentTimer
          timetable={timeTableShimbashi.timetable}
          activeDays={timeTableShimbashi.activeDays}>
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
  );
};
TimersBoard.propTypes = {
  delay: PropTypes.number,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
TimersBoard.defaultProps = {
  delay: 1000,
};

export default withStyles(TimersBoardStyle)(TimersBoard);
