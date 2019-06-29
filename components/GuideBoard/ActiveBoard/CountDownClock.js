import React from 'react';
import moment from 'moment';

// material-ui
import Typography from '@material-ui/core/Typography';

// styles
import useStyles from '~/styles/GuideBoard/CountDownClock-Style';

const CountDownClock = ({ remaining }) => {
  const remainingTime = moment.utc(remaining);
  const hasHours = remainingTime.hours() > 0;

  const { time, suffix } = useStyles();

  return (
    <Typography>
      { hasHours && <span className={time}>{remainingTime.format('H')}</span> }
      { hasHours && <span className={suffix}>時間</span> }
      <span className={time}>
        { remainingTime.format('mm') }
      </span>
      <span className={suffix}>分</span>
      <span className={time}>
        { remainingTime.format('ss') }
      </span>
      <span className={suffix}>秒</span>
    </Typography>
  );
};

export default CountDownClock;
