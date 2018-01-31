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
import Button from 'material-ui/Button';
import ArrowCollapseIcon from 'mdi-material-ui/ArrowCollapse';
import ArrowExpandIcon from 'mdi-material-ui/ArrowExpand';

// libs
import { isTimetableCollapse, updateTimetableCollapse } from '../libs/db';
import { momentFromVersion } from '../libs/timeTableDataHandler';

// components
import GA from './GA';

// styles
import TimeTableStyles from '../styles/TimeTable-Style';

class TimeTable extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      version: PropTypes.number,
      id: PropTypes.string,
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
    inactiveDay: PropTypes.bool,
    afterTheLastBus: PropTypes.bool,
    timestamp: PropTypes.number.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
  }
  static defaultProps = {
    nextTime: null,
    inactiveDay: false,
    afterTheLastBus: false,
  }

  constructor(props, ...args) {
    super(props, ...args);
    const { timestamp, nextTime } = props;
    this.setMainHourRange(timestamp, nextTime);
    this.state = {
      collapse: false,
    };
  }

  componentDidMount() {
    if (this.isInOperation()) {
      (async () => {
        const isCollapse = await isTimetableCollapse(this.props.data.id);
        this.setState({ collapse: isCollapse });
      })();
    }
  }

  componentWillReceiveProps({ timestamp, nextTime }) {
    this.setMainHourRange(timestamp, nextTime);
  }

  setMainHourRange = (timestamp, nextTime) => {
    const currentHour = moment(timestamp).hours();
    // taking 4 hours for showing collapsed view
    let displayStartHour;
    if (nextTime != null && currentHour !== moment(nextTime).hours()) {
      displayStartHour = currentHour;
    } else {
      displayStartHour = currentHour - 1;
    }
    this.mainHourRange = range(displayStartHour, displayStartHour + 4);
  }

  isInOperation = () => !this.props.inactiveDay && !this.props.afterTheLastBus

  buildRow = ({ hour, minutes, estimated }, index) => {
    const { classes } = this.props;
    const { collapse } = this.state;
    if (collapse && !this.mainHourRange.includes(hour)) { return null; }
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
    const isNextTime = nextTime && hhmm === moment(nextTime).format('HH:mm');
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

  handleClick = async () => {
    const nextCollapse = !this.state.collapse;
    const { id, name } = this.props.data;
    await updateTimetableCollapse(id, nextCollapse);
    GA.event({
      category: 'Timetable',
      action: nextCollapse ? 'Collapse' : 'Expand',
      label: name,
      callback: () => { this.setState({ collapse: nextCollapse }); },
    });
  }

  render() {
    const { classes, data } = this.props;
    const { collapse } = this.state;
    const timetableUpdatedAt =
            momentFromVersion(data.version).format('YYYY/MM/DD');
    const toggle = {
      Icon: collapse ? ArrowExpandIcon : ArrowCollapseIcon,
      label: collapse ? '全ての時間帯を表示する' : '4時間分だけ表示する',
    };
    const ToggleButton = () => (this.isInOperation() ? (
      <Button dense onClick={this.handleClick}>
        { toggle.label }
        { <toggle.Icon className={classes.buttonIcon} /> }
      </Button>
    ) : null);
    return (
      <section>
        <div className={classes.headlineContainer}>
          <Typography type="headline">
            { data.name }
            <Typography component="span" className={classes.headlineSuffix}>
              発
            </Typography>
          </Typography>
          <ToggleButton />
        </div>
        <Typography type="caption" gutterBottom>
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
        <Typography type="caption" align="right" className={classes.updatedAt}>
          時刻表更新日：{ timetableUpdatedAt }
        </Typography>
      </section>
    );
  }
}
export default withStyles(TimeTableStyles)(TimeTable);
