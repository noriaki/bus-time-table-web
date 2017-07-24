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
    this.state = { ...this.buildState(), index: 0 };
  }

  componentDidMount() {
    this.timer = setInterval(this.handleTick, 1000);
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
    nextState.isNeedLeft = nextState.index > 0;
    nextState.isNeedRight = nextState.index < this.nextTimeList.length - 1;
    return nextState;
  }

  handleTick = () => this.setState(this.buildState())

  handlePrev = (event) => {
    if (isDoubleTouchTap(event)) {
      this.setState({ index: 0 });
    } else {
      this.setState({ index: this.state.index - 1 });
    }
  }
  handleNext = (event) => {
    if (isDoubleTouchTap(event)) {
      this.setState({ index: this.nextTimeList.length - 1 });
    } else {
      this.setState({ index: this.state.index + 1 });
    }
  }

  render() {
    const {
      index, isInactive, isEnded, isNeedLeft, isNeedRight,
    } = this.state;
    const { data, dest } = this.props;
    const currentTargetTime = this.nextTimeList[index];
    const nextRemaining = Math.abs(moment().diff(currentTargetTime));
    let targetTime;
    const isActive = !isInactive && !isEnded;
    if (isActive) { targetTime = currentTargetTime.toObject(); }
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
