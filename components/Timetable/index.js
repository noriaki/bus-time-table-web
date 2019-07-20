import React, { useEffect, Fragment } from 'react';

// material-ui
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

// components
import HourRow from './HourRow';

const Timetable = ({ clock, TimetableContainer }) => {
  const timetable = TimetableContainer.useContainer();
  const { currentTime } = clock;

  useEffect(() => { timetable.tick(currentTime); }, [currentTime]);

  const nextTime = timetable.nearestTime();
  const rows = timetable.data.map(
    data => <HourRow key={`${data.hour}`} {...data} nextTime={nextTime} />
  );

  return (
    <Fragment>
      <Typography component="h3" variant="h6">
        { timetable.name }
        <Typography component="span" variant="caption">発</Typography>
      </Typography>
      <Table padding="none" size="small">
        <TableBody>
          { rows }
        </TableBody>
      </Table>
      <Typography variant="caption">
        灰色の時間帯は発着目安時刻です。
        到着時に待っている人だけ乗車可能ですのでご注意ください。
        <br />
        時刻表更新日：
        { timetable.lastUpdate.format('YYYY/MM/DD') }
      </Typography>
    </Fragment>
  );
};

export default Timetable;
