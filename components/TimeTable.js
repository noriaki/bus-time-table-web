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
import range from 'lodash.range';

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
    nextTime: PropTypes.number,
    remaining: PropTypes.number,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
  }
  static defaultProps = { // TODO: to required
    nextTime: moment().add(30, 'minutes').valueOf(),
    remaining: 30 * 60 * 1000,
  }

  constructor(props, ...args) {
    super(props, ...args);
    const { nextTime, remaining } = props;
    this.setMainHourRange({ nextTime, remaining });
    this.state = {
      expanded: true,
    };
  }

  componentDidMount() {}

  componentWillReceiveProps({ nextTime, remaining }) {
    this.setMainHourRange({ nextTime, remaining });
  }

  setMainHourRange = ({ nextTime, remaining }) => {
    const currentTime = nextTime - remaining;
    const currentHour = moment(currentTime).hours();
    // taking 4 hours for showing expanded view
    this.mainHourRange = range(currentHour - 1, currentHour + 3);
  }

  buildRow = ({ hour, minutes, estimated }, index) => {
    const { classes } = this.props;
    const { expanded } = this.state;
    if (!expanded && !this.mainHourRange.includes(hour)) { return null; }
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
          { minutes.map(this.buildMinutesColumn(hour)) }
        </TableCell>
      </TableRow>
    );
  }

  buildMinutesColumn = hour => (minute) => {
    const { classes, nextTime } = this.props;
    const time = moment({ hour, minute });
    const hhmm = time.format('HH:mm');
    const pos = Math.floor(minute / 5);
    const isNextTime = hhmm === moment(nextTime).format('HH:mm');
    const className = classnames(
      classes.timetableMinuteColumn,
      classes[pos],
      isNextTime ? classes.currentTimeMinuteColumn : undefined
    );
    return (
      <span key={hhmm} title={hhmm} className={className}>
        { time.format('mm') }
      </span>
    );
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
                { data.timetable.map(this.buildRow) }
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    );
  }
}
export default withStyles(TimeTableStyles)(TimeTable);
