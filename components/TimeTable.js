import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Table, {
  TableBody,
  TableCell,
  TableRow,
} from 'material-ui/Table';

// styles
import TimeTableStyles from '../styles/TimeTable-Style';

class TimeTable extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      version: PropTypes.number,
      name: PropTypes.string,
      timetable: PropTypes.arrayOf(
        PropTypes.shape({
          hour: PropTypes.number,
          minutes: PropTypes.arrayOf(PropTypes.number),
          estimated: PropTypes.bool,
        })
      ),
    }).isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
  }

  render() {
    const { classes, data } = this.props;
    return (
      <section>
        <Typography type="headline" className={classes.headline}>
          { data.name }
          <Typography component="span" className={classes.headlineSuffix}>
            発
          </Typography>
        </Typography>
        <Typography type="caption" className={classes.caption}>
          灰色の時間帯は発着目安時刻です。<br />
          到着時点で待っている人のみ乗車可能ですのでご注意ください。
        </Typography>
        <Card>
          <CardContent className={classes.cardContentRoot}>
            <Table className={classes.timetableRoot}>
              <TableBody>
                { data.timetable.map(buildTimeTableRow(classes)) }
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    );
  }
}
export default withStyles(TimeTableStyles)(TimeTable);

const buildTimeTableRow = classes => ({ hour, minutes, estimated }, index) => {
  const minutesColumnClassName = classnames(
    classes.timetableMinutesContainer,
    estimated ? classes.timetableMinutesContainerEstimated : undefined
  );
  return (
    <TableRow key={`${index}-${hour}`} className={classes.timetableRow}>
      <TableCell padding="dense" className={classes.timetableHourColumn}>
        { moment({ hour }).format('HH') }
      </TableCell>
      <TableCell padding="dense" className={minutesColumnClassName}>
        { minutes.map(buildTimeTableMinutes({ hour, classes })) }
      </TableCell>
    </TableRow>
  );
};

const buildTimeTableMinutes = ({ hour, classes }) => (minute) => {
  const time = moment({ hour, minute });
  const pos = Math.floor(minute / 5);
  const className = classnames(classes.timetableMinuteColumn, classes[pos]);
  return (
    <span key={time.format('HH:mm')} className={className}>
      { time.format('mm') }
    </span>
  );
};
