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

import useStyles from './index.styles';

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
        {timetable.station}から発車するバスの{timetable.label}の時刻表
        <br />
        最終更新日：{timetable.displayPublishedDate()}
      </caption>
      <TableBody>
        {mapDataToHours(data).map((d) => (
          <TableRow key={`${d.hour}`}>
            <TableCell
              variant="head"
              component="th"
              align="center"
              scope="row"
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
