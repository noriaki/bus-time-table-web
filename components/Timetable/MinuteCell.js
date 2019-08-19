import React from 'react';
import clsx from 'clsx';

// material-ui
import Typography from '@material-ui/core/Typography';

// styles
import useStyles from '~/styles/Timetable/MinuteCell-Style';

const MinuteCell = ({ minute, current = false }) => {
  const index = Math.floor(minute / 5);
  const classes = useStyles();
  const className = clsx(
    classes[`pos${index + 1}`],
    { [classes.current]: current }
  );

  return (
    <Typography component="span" className={className}>
      { `${minute}`.padStart(2, '0') }
    </Typography>
  );
};

export default MinuteCell;
