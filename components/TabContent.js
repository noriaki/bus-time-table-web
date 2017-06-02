import React from 'react';
import NoSSR from 'react-no-ssr';
import CircularProgress from 'material-ui/CircularProgress';

import { blueSky } from '../themes/colors';

import BoardingTimer from './BoardingTimer';
import TimeTable from './TimeTable';

const TabContent = ({ dest, data, activeDays }) => (
  <div key={dest}>
    <section>
      <NoSSR onSSR={<Loading />}>
        <BoardingTimer data={data} dest={dest} activeDays={activeDays} />
      </NoSSR>
    </section>
    <section>
      <TimeTable data={data} />
    </section>
  </div>
);

export default TabContent;

const Loading = () => (
  <div style={styles.loadingContainer}>
    <CircularProgress size={30} color={blueSky} />
  </div>
);

const styles = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
};
