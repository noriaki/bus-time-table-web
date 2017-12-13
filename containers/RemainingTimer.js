import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';

import {
  flattenTimeTable,
  sliceNextTimeList,
} from '../libs/timeTableDataHandler';

class RemainingTimer extends PureComponent {
  constructor(props, ...args) {
    super(props, ...args);
    const { timetable, timer } = props;
    this.timetable = flattenTimeTable(timetable);
    this.state = {
      timetable: sliceNextTimeList(this.timetable, timer.timestamp),
      index: 0,
    };
  }

  componentWillReceiveProps({ timer }) {
    const { timetable, index } = this.state;
    const nextTimetable = sliceNextTimeList(timetable, timer.timestamp);
    if (timetable.length !== nextTimetable.length) {
      const nextIndex = index > 0 ? index - 1 : 0;
      this.setState({
        timetable: nextTimetable,
        index: nextIndex,
      });
    }
  }

  handleChangeTargetTo = (prevOrNext) => {
    const { timetable, index } = this.state;
    if (index !== timetable.length - 1 && prevOrNext === 'next') {
      return () => this.setState({ index: index + 1 });
    } else if (index !== 0 && prevOrNext === 'prev') {
      return () => this.setState({ index: index - 1 });
    }
    return false;
  }

  render() {
    const { children } = this.props;
    const { timetable, index } = this.state;
    const nextTime = timetable[index];
    const remaining = nextTime.diff(Date.now());
    const ChildComponent = Children.only(children);
    return (
      <ChildComponent.type
        {...ChildComponent.props}
        nextTime={nextTime.valueOf()}
        remaining={remaining.valueOf()}
        onPrev={this.handleChangeTargetTo('prev')}
        onNext={this.handleChangeTargetTo('next')} />
    );
  }
}
RemainingTimer.propTypes = {
  children: PropTypes.element.isRequired,
  timetable: PropTypes.arrayOf(
    PropTypes.shape({
      hour: PropTypes.number,
      minutes: PropTypes.arrayOf(PropTypes.number),
    })
  ).isRequired,
  timer: PropTypes.shape({
    timestamp: PropTypes.number.isRequired,
  }).isRequired,
};
export default RemainingTimer;
