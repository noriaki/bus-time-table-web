import React, { Component } from 'react';
import NoSSR from 'react-no-ssr';
import TimerMixin from 'react-timer-mixin';
import moment from 'moment';
import CircularProgress from 'material-ui/CircularProgress';

import { flattenTimeTable, findNextTime } from '../libs/timeTableDataHandler';

import { blueSky } from '../themes/colors';

import RemainingClock from './RemainingClock';
import TimeTable from './TimeTable';

class TabContent extends Component {
  state = buildNextState(flattenTimeTable(this.props.data))

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
    const { data, dest, activeDays } = this.props;
    const targetTime = (nextTime && nextTime.toObject()) || {};
    return (
      <div>
        <section>
          <NoSSR onSSR={<Loading />}>
            <RemainingClock
              activeDays={activeDays.includes(moment().days())}
              remaining={nextRemaining}
              time={nextTime}
              dest={dest} />
          </NoSSR>
        </section>
        <section>
          <TimeTable data={data} targetTime={targetTime} />
        </section>
      </div>
    );
  }
}

export default props => <TabContent key={props.dest} {...props} />;

const Loading = () => (
  <div style={styles.loadingContainer}>
    <CircularProgress size={30} color={blueSky} />
  </div>
);

const buildNextState = (timeTableData, currentTime = moment()) => {
  const nextTime = findNextTime(timeTableData, currentTime);
  const nextRemaining = nextTime ? nextTime.diff(currentTime) : null;
  return { nextTime, nextRemaining };
};

const styles = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
};
