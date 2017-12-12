import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';

import DepartureInfoStyles from '../../styles/GuideBoard/DepartureInfo-Style';

const DepartureInfo = ({ departure, nextTime, classes }) => {
  const targetTime = moment(nextTime);
  return (
    <h1 className={classes.container}>
      <span className={classes.departure}>{departure}</span>
      <span className={classes.time}>{targetTime.format('HH:mm')}</span>
      <span className={classes.suffix}>発</span>
    </h1>
  );
};
DepartureInfo.propTypes = {
  departure: PropTypes.string.isRequired,
  nextTime: PropTypes.number.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(DepartureInfoStyles)(DepartureInfo);
