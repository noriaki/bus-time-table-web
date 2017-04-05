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
    const { nextRemaining } = this.state;
    return <RemainingClock remaining={nextRemaining} />;
  }
}

const buildNextState = (timeTableData, currentTime = moment()) => {
  const nextTime = findNextTime(timeTableData, currentTime);
  return { nextTime, nextRemaining: nextTime.diff(currentTime) };
};
