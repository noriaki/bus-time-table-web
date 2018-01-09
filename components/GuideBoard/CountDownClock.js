import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';

import CountDownClockStyles from '../../styles/GuideBoard/CountDownClock-Style';

const CountDownClock = ({ remaining, classes }) => {
  const remainingTime = moment.utc(remaining);
  const hasHours = remainingTime.hours() > 0;
  return (
    <p className={classes.container}>
      {hasHours &&
      <span className={classes.time}>{remainingTime.format('HH')}</span>}
      {hasHours && <span className={classes.suffix}>時間</span>}
      <span className={classes.time}>{remainingTime.format('mm')}</span>
      <span className={classes.suffix}>分</span>
      <span className={classes.time}>{remainingTime.format('ss')}</span>
      <span className={classes.suffix}>秒</span>
    </p>
  );
};
CountDownClock.propTypes = {
  remaining: PropTypes.number.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(CountDownClockStyles)(CountDownClock);
