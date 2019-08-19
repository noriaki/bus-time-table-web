import React from 'react';
import moment from 'moment';
import clsx from 'clsx';

// material-ui
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

// components
import MinuteCell from './MinuteCell';

// styles
import useStyles from '~/styles/Timetable/HourRow-Style';

const HourRow = ({
  hour,
  minutes,
  estimated,
  nextTime,
}) => {
  const cells = minutes.map((minute) => {
    let current = false;
    if (nextTime != null) {
      const { hours: nextHour, minutes: nextMinute } = nextTime.toObject();
      current = (hour === nextHour && minute === nextMinute);
    }
    return <MinuteCell key={`${minute}`} minute={minute} current={current} />;
  });

  const classes = useStyles();
  const columnClassName = clsx(estimated && classes.estimatedColumn);

  return (
    <TableRow>
      <TableCell
        variant="head"
        align="center"
        className={classes.head}>
        { moment({ hour }).format('HH') }
      </TableCell>
      <TableCell align="center" className={columnClassName}>
        <div className={classes.cellContainer}>
          { cells }
        </div>
      </TableCell>
    </TableRow>
  );
};

export default HourRow;
