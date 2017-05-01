import React from 'react';
import NoSSR from 'react-no-ssr';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';

import ShareIcon from 'material-ui/svg-icons/social/share';

import AppInformationMenu from './AppInformationMenu';
import AddToHomescreen from './AddToHomescreen';

const AppNavigation = ({ info }) => (
  <Paper zDepth={1}>
    <Toolbar style={styles.toolbar}>
      <ToolbarGroup style={styles.toolbarGroup}>
        <AppInformationMenu {...info} />
        <NoSSR>
          <AddToHomescreen />
        </NoSSR>
        <IconButton
          touch
          tooltip="Share"
          tooltipPosition="top-left"
          onTouchTap={() => console.log('share')}>
          <ShareIcon />
        </IconButton>
      </ToolbarGroup>
    </Toolbar>
  </Paper>
);

export default AppNavigation;

const styles = {
  toolbar: {
    padding: 0,
  },
  toolbarGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
};
