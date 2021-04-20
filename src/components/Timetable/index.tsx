import React, { FC } from 'react';

// material-ui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Timetable from '~/models/Timetable';
import { leftFillZero } from '~/presenters/TimetablePresenter';

type Props = {
  timetable: Timetable;
};
type FCwithProps = FC<Props>;

const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55] as const;

const TimetableComponent: FCwithProps = ({ timetable }) => {
  const data = timetable.asData();

  return (
    <Table padding="none" size="small">
      <TableBody>
        {data.map((d) => (
          <TableRow key={`${d.hour}`}>
            <TableCell variant="head" component="th" align="center">
              {leftFillZero(d.hour)}
            </TableCell>
            {minutes.map((minute) => (
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

export default TimetableComponent;
