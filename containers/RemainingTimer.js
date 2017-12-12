import React, { PureComponent } from 'react';

class RemainingTimer extends PureComponent {
  constructor(props, ...args) {
    super(props, ...args);
    const { timer, timetable } = props;
    this.timetable = timetable;
    this.timetable, timer.timestamp
  }
}
export default RemainingTimer;
