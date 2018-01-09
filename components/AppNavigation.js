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

const icons = {
  '/': TimerIcon,
  '/timetable': TimeTableIcon,
  '/info': InfoIcon,
};

const AppNavigation = ({
  pathsAndLabels,
  currentPathname,
  onNavigationChange,
  classes,
}) => (
  <div className={classes.container}>
    <BottomNavigation
      value={currentPathname}
      showLabels
      onChange={onNavigationChange}>
      { pathsAndLabels.map(buildBottomNavigationButton) }
    </BottomNavigation>
  </div>
);
export default withStyles(AppNavigationStyles)(AppNavigation);

const buildBottomNavigationButton = ({ path, label }) => {
  const Icon = icons[path];
  return (
    <BottomNavigationButton
      key={path}
      label={label}
      value={path}
      icon={<Icon />} />
  );
};
