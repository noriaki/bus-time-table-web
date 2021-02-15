import React, { useEffect } from 'react';

// material-ui
import Paper from '@material-ui/core/Paper';

// components
import ActiveBoard from './ActiveBoard';
import InactiveBoard from './InactiveBoard';

// styles
import useStyles from '~/styles/GuideBoard-Style';

const GuideBoard = ({ clock, Timetable, mini }) => {
  const timetable = Timetable.useContainer();
  const { currentTime } = clock;

  useEffect(() => {
    timetable.tick(currentTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime]);

  const classes = useStyles();
  let boardComponent;

  if (timetable.isSuspendedDay()) {
    const { title, subtitle } = timetable.suspendedReason();
    boardComponent = (
      <InactiveBoard name={timetable.name} title={title} subtitle={subtitle} />
    );
  } else if (timetable.isClosedDay()) {
    const title = '本日バス運行はありません';
    const subtitle = '(運行は土日祝を除く平日のみ)';
    boardComponent = (
      <InactiveBoard name={timetable.name} title={title} subtitle={subtitle} />
    );
  } else if (timetable.isOutOfService()) {
    const title = '本日のバスは終了しました';
    const subtitle = '(明日以降は時刻表を参照)';
    boardComponent = (
      <InactiveBoard name={timetable.name} title={title} subtitle={subtitle} />
    );
  } else {
    const nextTime = timetable.nextTime();
    boardComponent = (
      <ActiveBoard
        timetable={timetable}
        currentTime={currentTime}
        nextTime={nextTime}
        mini={mini}
      />
    );
  }

  return (
    <Paper component="section" className={classes.root}>
      {boardComponent}
    </Paper>
  );
};

export default GuideBoard;
