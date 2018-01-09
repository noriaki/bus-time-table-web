import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';

import {
  flattenTimeTable,
  sliceNextTimeList,
} from '../libs/timeTableDataHandler';

class RemainingTimer extends PureComponent {
  constructor(props, ...args) {
    super(props, ...args);
    const { timetable } = props;
    const { timestamp } = props.timer;
    this.timetable = timetable;
    this.state = {
      timetable: sliceNextTimeList(flattenTimeTable(timetable), timestamp),
      index: 0,
    };
  }

  componentWillReceiveProps({ timer }) {
    const { index } = this.state;
    const currentTimetable = this.state.timetable;
    const nextTimetable = sliceNextTimeList(
      flattenTimeTable(this.timetable), timer.timestamp
    );
    if (currentTimetable.length !== nextTimetable.length) {
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
    const ChildComponent = Children.only(children);
    const nextTime = timetable[index];
    if (nextTime === undefined) { // after the last bus has gone
      return (
        <ChildComponent.type {...ChildComponent.props} afterTheLastBus />
      );
    }
    const remaining = nextTime.diff(Date.now());
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
