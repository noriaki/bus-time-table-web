import React from 'react';
import moment from 'moment';

// material-ui
import Typography from '@material-ui/core/Typography';

// styles
import useStyles from '~/styles/GuideBoard/ActiveBoard/CountDownClock-Style';

const CountDownClock = ({ remaining }) => {
  const rTime = moment.utc(remaining);
  const hasHours = rTime.hours() > 0;

  const classes = useStyles();

  return (
    <Typography>
      { hasHours && <span className={classes.time}>{rTime.format('H')}</span> }
      { hasHours && <span className={classes.suffix}>時間</span> }
      <span className={classes.time}>
        { rTime.format('mm') }
      </span>
      <span className={classes.suffix}>分</span>
      <span className={classes.time}>
        { rTime.format('ss') }
      </span>
      <span className={classes.suffix}>秒</span>
    </Typography>
  );
};

export default CountDownClock;
