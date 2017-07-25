import React, { Component } from 'react';
import moment from 'moment';
import { styled } from 'react-free-style';
import NoSSR from 'react-no-ssr';
import CircularProgress from 'material-ui/CircularProgress';

import {
  flattenTimeTable,
  sliceNextTimeList,
  isInactiveDays,
} from '../libs/timeTableDataHandler';
import isDoubleTouchTap from '../libs/isDoubleTouchTap';

import { blueSky } from '../themes/colors';
import LoadingBoxStyles from '../styles/LoadingBox-Style';

import RemainingClock from './RemainingClock';
import TimeTable from './TimeTable';
import NextPrevBusButton from './NextPrevBusButton';

class RemainingTimer extends Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.timeTableData = props.data;
    this.activeDays = props.activeDays;
    this.nextTimeList = [];
    this.timer = null;
    this.state = this.buildState();
  }

  componentDidMount() {
    this.toggleTimer(true);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  buildState(currentTime) {
    const prevState = this.state || {};
    const timeTable = flattenTimeTable(this.timeTableData);
    this.nextTimeList = sliceNextTimeList(timeTable, currentTime);
    const nextTime = this.nextTimeList[0];
    const isInactive = isInactiveDays(this.activeDays, currentTime);
    const isEnded = nextTime == null;
    const index = prevState.index || 0;
    const nextState = { nextTime, isInactive, isEnded, index };
    if (prevState.nextTime &&
        nextTime &&
        nextState.index &&
        !prevState.nextTime.isSame(nextTime)) {
      nextState.index -= 1;
    }
    return nextState;
  }

  handleTick = () => {
    this.setState(this.buildState());
  }

  handlePrev = (event) => {
    if (isDoubleTouchTap(event)) {
      event.preventDefault();
      this.setState({ index: 0 });
    } else {
      this.setState({ index: this.state.index - 1 });
    }
  }
  handleNext = (event) => {
    if (isDoubleTouchTap(event)) {
      event.preventDefault();
      this.setState({ index: this.nextTimeList.length - 1 });
    } else {
      this.setState({ index: this.state.index + 1 });
    }
  }

  toggleTimer = (isFrontmost) => {
    if (isFrontmost && this.timer == null) {
      if (global && global.window !== undefined) {
        this.timer = window.setInterval(this.handleTick, 1000);
      }
    } else if (!isFrontmost && this.timer != null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  render() {
    const { index, isInactive, isEnded } = this.state;
    const { data, dest, front } = this.props;
    const currentTargetTime = this.nextTimeList[index];
    const nextRemaining = Math.abs(moment().diff(currentTargetTime));
    let targetTime;
    const isActive = !isInactive && !isEnded;
    const isNeedLeft = index > 0;
    const isNeedRight = index < this.nextTimeList.length - 1;
    if (isActive) { targetTime = currentTargetTime.toObject(); }
    this.toggleTimer(front);
    return (
      <div>
        <section>
          <NoSSR onSSR={<Loading />}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <NextPrevBusButton
                left={isNeedLeft}
                active={isActive}
                onTouchTap={this.handlePrev} />
              <RemainingClock
                dest={dest}
                ended={isEnded}
                inactive={isInactive}
                last={!isNeedRight}
                remaining={nextRemaining}
                time={currentTargetTime} />
              <NextPrevBusButton
                right={isNeedRight}
                active={isActive}
                onTouchTap={this.handleNext} />
            </div>
          </NoSSR>
        </section>
        <section>
          <TimeTable data={data} targetTime={targetTime} />
        </section>
      </div>
    );
  }
}

export default RemainingTimer;

const Loading = styled(LoadingBoxStyles)(({ styles }) => (
  <div className={styles.loadingContainer}>
    <CircularProgress size={30} color={blueSky} />
  </div>
));
