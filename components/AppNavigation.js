import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import TimerIcon from 'material-ui-icons/Schedule';
import TimeTableIcon from 'material-ui-icons/ViewList';
// import GetAppIcon from 'material-ui-icons/GetApp';
import InfoIcon from 'material-ui-icons/InfoOutline';
// import ShareIcon from 'material-ui-icons/Share';

import AppNavigationStyles from '../styles/AppNavigation-Style';

const AppNavigation = ({ classes }) => (
  <div className={classes.container}>
    <BottomNavigation value={0} showLabels>
      <BottomNavigationButton label="タイマー" icon={<TimerIcon />} />
      <BottomNavigationButton label="時刻表" icon={<TimeTableIcon />} />
      {/* <BottomNavigationButton label="アプリ" icon={<GetAppIcon />} /> */}
      <BottomNavigationButton label="お知らせ" icon={<InfoIcon />} />
      {/* <BottomNavigationButton label="シェア" icon={<ShareIcon />} /> */}
    </BottomNavigation>
  </div>
);
export default withStyles(AppNavigationStyles)(AppNavigation);

/*
import React from 'react';
import NoSSR from 'react-no-ssr';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';

import AppInformationMenu from './AppInformationMenu';
import AddToHomescreen from './AddToHomescreen';
import ShareMenu from './ShareMenu';

import { toolbar, toolbarGroup } from '../styles/AppNavigation-Style';

const AppNavigation = ({ info, os }) => (
  <Paper zDepth={1}>
    <Toolbar style={toolbar}>
      <ToolbarGroup style={toolbarGroup}>
        <NoSSR>
          <AppInformationMenu {...info} />
        </NoSSR>
        <NoSSR>
          <AddToHomescreen os={os} />
        </NoSSR>
        <NoSSR>
          <ShareMenu os={os} />
        </NoSSR>
      </ToolbarGroup>
    </Toolbar>
  </Paper>
);

export default AppNavigation;
*/
