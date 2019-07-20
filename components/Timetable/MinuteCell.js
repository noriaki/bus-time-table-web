import React from 'react';
import moment from 'moment';

// material-ui
import Typography from '@material-ui/core/Typography';

// styles
import useStyles from '~/styles/Timetable/MinuteCell-Style';

const MinuteCell = ({ minute, current = false }) => {
  const mm = moment({ minute }).format('mm');

  const classes = useStyles({ index: Math.floor(minute / 5), current });

  return (
    <Typography component="span" classes={classes}>{ mm }</Typography>
  );
};

export default MinuteCell;
