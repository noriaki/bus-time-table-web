import React from 'react';
import NoSSR from 'react-no-ssr';
import { Tab } from 'material-ui/Tabs';
import CircularProgress from 'material-ui/CircularProgress';

import { blueSky } from '../themes/colors';

import BoardingTimer from './BoardingTimer';
import TimeTable from './TimeTable';

const TabContent = ({ label, dest, C, data }) => (
  <Tab key={label} label={makeLabel({ label, C })}>
    <section>
      <NoSSR onSSR={<Loading />}>
        <BoardingTimer data={data} dest={dest} />
      </NoSSR>
    </section>
    <section>
      <TimeTable data={data} />
    </section>
  </Tab>
);

export default TabContent;

const makeLabel = ({ label, C, ...props }) => (
  <div>
    <span style={styles.icon}>
      <C.type {...C.props} style={styles.svg} {...props} />
    </span>
    {label}
  </div>
);

const Loading = () => (
  <div style={styles.loadingContainer}>
    <CircularProgress size={30} color={blueSky} />
  </div>
);

const styles = {
  icon: {
    display: 'inline-flex',
    alignSelf: 'center',
    position: 'relative',
    height: '1.4em',
    width: '1.4em',
    marginRight: '0.3em',
  },
  svg: {
    color: 'inherit',
    height: '1.4em',
    width: '1.4em',
    position: 'absolute',
    bottom: '-0.3em',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
};
