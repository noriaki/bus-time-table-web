import React, { Component } from 'react';
import moment from 'moment';
import { styled } from 'react-free-style';
import NoSSR from 'react-no-ssr';
import CircularProgress from 'material-ui/CircularProgress';

import {
  flattenTimeTable,
  findNextTime,
  isInactiveDays,
} from '../libs/timeTableDataHandler';

import { blueSky } from '../themes/colors';
import LoadingBoxStyles from '../styles/LoadingBox-Style';

import RemainingClock from './RemainingClock';
import TimeTable from './TimeTable';

class RemainingTimer extends Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.timeTableData = props.data;
    this.activeDays = props.activeDays;
    this.state = this.buildNextState();
  }

  componentDidMount() {
    this.timer = setInterval(this.handleTick.bind(this), 1000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  buildNextState(currentTime) {
    const nextTime = findNextTime(
      flattenTimeTable(this.timeTableData), currentTime
    );
    const isInactive = isInactiveDays(this.activeDays, currentTime);
    const isEnded = nextTime == null;
    return { nextTime, isInactive, isEnded };
  }

  handleTick() {
    this.setState(this.buildNextState());
  }

  render() {
    const { nextTime, isInactive, isEnded } = this.state;
    const { data, dest } = this.props;
    const nextRemaining = Math.abs(moment().diff(nextTime));
    let targetTime;
    if (!isInactive && !isEnded) { targetTime = nextTime.toObject(); }
    return (
      <div>
        <section>
          <NoSSR onSSR={<Loading />}>
            <RemainingClock
              dest={dest}
              ended={isEnded}
              inactive={isInactive}
              remaining={nextRemaining}
              time={nextTime} />
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
