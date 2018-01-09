import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';

import {
  flattenTimeTable,
  sliceNextTimeList,
  isInactiveDays,
} from '../libs/timeTableDataHandler';

class RemainingTimer extends PureComponent {
  constructor(props, ...args) {
    super(props, ...args);
    const { timer, timetable, activeDays } = props;
    this.timetable = timetable;
    this.activeDays = activeDays;
    this.state = { ...this.getNextState(timer.timestamp), index: 0 };
  }

  componentWillReceiveProps({ timer }) {
    const { index } = this.state;
    const currentTimetable = this.state.timetable;
    const nextState = this.getNextState(timer.timestamp);
    if (currentTimetable.length !== nextState.timetable.length) {
      const nextIndex = index > 0 ? index - 1 : 0;
      this.setState({ ...nextState, index: nextIndex });
    }
  }

  getNextState = (timestamp) => {
    const timetable = sliceNextTimeList(
      flattenTimeTable(this.timetable), timestamp
    );
    return {
      timetable,
      afterTheLastBus: timetable.length === 0,
      inactiveDay: isInactiveDays(this.activeDays, timestamp),
    };
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
    const {
      timetable,
      index,
      afterTheLastBus,
      inactiveDay,
    } = this.state;
    const ChildComponent = Children.only(children);
    const nextTime = timetable[index];
    // holidays today or after the last bus has gone
    if (inactiveDay || afterTheLastBus) {
      return (
        <ChildComponent.type
          {...ChildComponent.props}
          inactiveDay={inactiveDay}
          afterTheLastBus={afterTheLastBus} />
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
  activeDays: PropTypes.arrayOf(PropTypes.number),
  timer: PropTypes.shape({
    timestamp: PropTypes.number.isRequired,
  }).isRequired,
};
RemainingTimer.defaultProps = {
  activeDays: [1, 2, 3, 4, 5],
};
export default RemainingTimer;
