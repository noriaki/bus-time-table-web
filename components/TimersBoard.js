import React, { useEffect } from 'react';

// material-ui icons
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

// containers
import Clock from '~/containers/ClockContainer';
import {
  HomeTimetable,
  HigashiGinzaTimetable,
  ShimbashiTimetable,
} from '~/containers/TimetableContainer';

// components
import GuideBoard from './GuideBoard';

// styles
import useStyles from '~/styles/TimersBoard-Style';

const TimersBoard = () => {
  const clock = Clock.useContainer();
  // componentDidMount, componentWillUnmount
  useEffect(() => {
    clock.start();
    return () => { clock.stop(); };
  }, []);

  const classes = useStyles();

  return (
    <article className={classes.container}>
      <div className={classes.itemFullWidth}>
        <HomeTimetable.Provider>
          <GuideBoard clock={clock} Timetable={HomeTimetable} />
        </HomeTimetable.Provider>
      </div>
      <div className={classes.itemRightSide}>
        <ArrowDownwardIcon className={classes.arrowIcon} />
      </div>
      <div className={classes.itemRightSide}>
        <HigashiGinzaTimetable.Provider>
          <GuideBoard clock={clock} Timetable={HigashiGinzaTimetable} mini />
        </HigashiGinzaTimetable.Provider>
      </div>
      <div className={classes.itemRightSide}>
        <ArrowDownwardIcon className={classes.arrowIcon} />
      </div>
      <div className={classes.itemFullWidth}>
        <ShimbashiTimetable.Provider>
          <GuideBoard clock={clock} Timetable={ShimbashiTimetable} />
        </ShimbashiTimetable.Provider>
      </div>
      <div className={classes.itemLeftSide}>
        <ArrowUpwardIcon className={classes.arrowIcon} />
        <ArrowUpwardIcon className={classes.arrowIcon} />
        <ArrowUpwardIcon className={classes.arrowIcon} />
      </div>
    </article>
  );
};

export default TimersBoard;
