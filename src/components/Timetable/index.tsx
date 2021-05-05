import React, { VFC } from 'react';

// material-ui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';

import { WeekdayTimetable, HolidayTimetable } from '~/models/Timetable';
import {
  timetableMinutes,
  mapDataToHours,
  leftFillZero,
} from '~/presenters/TimetablePresenter';

import useStyles from './index.style';

type Props = {
  timetable: WeekdayTimetable | HolidayTimetable;
};
type VFCwithProps = VFC<Props>;

const Timetable: VFCwithProps = ({ timetable }) => {
  const data = timetable.asData();

  const classes = useStyles({ isHoliday: timetable.isActiveOnHoliday });

  return (
    <Table padding="none" size="small" className={classes.root}>
      <caption>
        <Typography component="h4">{timetable.label}のバス時刻表</Typography>
      </caption>
      <TableBody>
        {mapDataToHours(data).map((d) => (
          <TableRow key={`${d.hour}`}>
            <TableCell
              variant="head"
              component="th"
              align="center"
              className={classes.head}
            >
              {leftFillZero(d.hour)}
            </TableCell>
            {timetableMinutes.map((minute) => (
              <TableCell key={`${d.hour}-${minute}`} align="center">
                {d.minutes.find((m) => minute === m) === undefined
                  ? ''
                  : leftFillZero(minute)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Timetable;
