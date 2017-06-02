import React, { Component } from 'react';
import TimerMixin from 'react-timer-mixin';
import moment from 'moment';

import { flattenTimeTable, findNextTime } from '../libs/timeTableDataHandler';
import RemainingClock from './RemainingClock';

export default class BoardingTimer extends Component {
  constructor(props) {
    super(props);
    this.state = buildNextState(flattenTimeTable(props.data));
  }

  componentDidMount() {
    this.timer = TimerMixin.setInterval(this.handleTick.bind(this), 1000);
  }

  componentWillUnmount() {
    TimerMixin.clearTimeout(this.timer);
  }

  handleTick() {
    this.setState(buildNextState(flattenTimeTable(this.props.data)));
  }

  render() {
    const { nextRemaining, nextTime } = this.state;
    const { dest, activeDays } = this.props;
    return (
      <RemainingClock
        activeDays={activeDays.includes(moment().days())}
        remaining={nextRemaining}
        time={nextTime}
        dest={dest} />
    );
  }
}

const buildNextState = (timeTableData, currentTime = moment()) => {
  const nextTime = findNextTime(timeTableData, currentTime);
  const nextRemaining = nextTime ? nextTime.diff(currentTime) : null;
  return { nextTime, nextRemaining };
};
