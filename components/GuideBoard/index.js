import React, { useEffect } from 'react';

// material-ui
import Paper from '@material-ui/core/Paper';

// components
import ActiveBoard from './ActiveBoard';
import InactiveBoard from './InactiveBoard';
import OutOfServiceBoard from './OutOfServiceBoard';

// styles
import useStyles from '~/styles/GuideBoard-Style';

const GuideBoard = ({ clock, Timetable, mini }) => {
  const timetable = Timetable.useContainer();
  const { currentTime } = clock;

  useEffect(() => { timetable.tick(currentTime); }, [currentTime]);

  const classes = useStyles();

  if (timetable.isClosedDay()) {
    return (
      <Paper component="section" className={classes.root}>
        <InactiveBoard timetable={timetable} mini={mini} />
      </Paper>
    );
  } else if (timetable.isOutOfService()) {
    return (
      <Paper component="section" className={classes.root}>
        <OutOfServiceBoard timetable={timetable} mini={mini} />
      </Paper>
    );
  }
  const nextTime = timetable.nextTime();

  return (
    <Paper component="section" className={classes.root}>
      <ActiveBoard
        timetable={timetable}
        currentTime={currentTime}
        nextTime={nextTime}
        mini={mini} />
    </Paper>
  );
};

export default GuideBoard;
