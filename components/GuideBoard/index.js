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
  let boardComponent;

  if (timetable.isClosedDay()) {
    boardComponent = <InactiveBoard timetable={timetable} />;
  } else if (timetable.isOutOfService()) {
    boardComponent = <OutOfServiceBoard timetable={timetable} />;
  } else {
    const nextTime = timetable.nextTime();
    boardComponent = (
      <ActiveBoard
        timetable={timetable}
        currentTime={currentTime}
        nextTime={nextTime}
        mini={mini} />
    );
  }

  return (
    <Paper component="section" className={classes.root}>
      { boardComponent }
    </Paper>
  );
};

export default GuideBoard;
