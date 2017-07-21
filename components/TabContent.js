import React, { Component } from 'react';
import { styled } from 'react-free-style';
import NoSSR from 'react-no-ssr';
import moment from 'moment';
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
import RouteMap from './RouteMap';

class TabContent extends Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.timeTableData = flattenTimeTable(props.data);
    this.state = buildNextState(this.timeTableData);
  }

  componentDidMount() {
    this.timer = setInterval(this.handleTick.bind(this), 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleTick() {
    this.setState(buildNextState(this.timeTableData));
  }

  render() {
    const { nextRemaining, nextTime } = this.state;
    const { id, data, dest, activeDays } = this.props;
    const isInactive = isInactiveDays(activeDays);
    const targetTime = (!isInactive && nextTime && nextTime.toObject()) || {};
    return (
      <div>
        <section>
          <NoSSR onSSR={<Loading />}>
            <RemainingClock
              inactive={isInactive}
              remaining={nextRemaining}
              time={nextTime}
              dest={dest} />
          </NoSSR>
        </section>
        <section>
          <TimeTable data={data} targetTime={targetTime} />
        </section>
        <section>
          <RouteMap id={id} dest={dest} />
        </section>
      </div>
    );
  }
}

export default props => <TabContent key={props.dest} {...props} />;

const Loading = styled(LoadingBoxStyles)(({ styles }) => (
  <div className={styles.loadingContainer}>
    <CircularProgress size={30} color={blueSky} />
  </div>
));

const buildNextState = (timeTableData, currentTime = moment()) => {
  const nextTime = findNextTime(timeTableData, currentTime);
  const nextRemaining = nextTime ? nextTime.diff(currentTime) : null;
  return { nextTime, nextRemaining };
};
