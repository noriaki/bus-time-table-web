import React from 'react';

// material-ui
import Typography from '@material-ui/core/Typography';

// libs
import dayjs from '~/libs/dayjs';

// styles
import useStyles from '~/styles/GuideBoard/ActiveBoard/CountDownClock-Style';

const CountDownClock = ({ remaining }) => {
  const remainingTime = dayjs.utc(remaining);
  const hasHours = remainingTime.hour() > 0;

  const classes = useStyles();

  return (
    <Typography>
      { hasHours && <span className={classes.time}>{remainingTime.format('H')}</span> }
      { hasHours && <span className={classes.suffix}>時間</span> }
      <span className={classes.time}>
        { remainingTime.format('mm') }
      </span>
      <span className={classes.suffix}>分</span>
      <span className={classes.time}>
        { remainingTime.format('ss') }
      </span>
      <span className={classes.suffix}>秒</span>
    </Typography>
  );
};

export default CountDownClock;
