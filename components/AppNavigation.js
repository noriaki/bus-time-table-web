import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, {
  BottomNavigationButton,
} from 'material-ui/BottomNavigation';
import TimerIcon from 'material-ui-icons/Schedule';
import TimeTableIcon from 'material-ui-icons/ViewList';
import InfoIcon from 'material-ui-icons/InfoOutline';

import AppNavigationStyles from '../styles/AppNavigation-Style';

const AppNavigation = ({ classes }) => (
  <div className={classes.container}>
    <BottomNavigation value={0} showLabels>
      <BottomNavigationButton label="タイマー" icon={<TimerIcon />} />
      <BottomNavigationButton label="時刻表" icon={<TimeTableIcon />} />
      {/* <BottomNavigationButton label="アプリ" icon={<GetAppIcon />} /> */}
      <BottomNavigationButton label="お知らせ" icon={<InfoIcon />} />
    </BottomNavigation>
  </div>
);
export default withStyles(AppNavigationStyles)(AppNavigation);
