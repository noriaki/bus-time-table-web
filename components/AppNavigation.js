import React from 'react';
import NoSSR from 'react-no-ssr';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';

import AppInformationMenu from './AppInformationMenu';
import AddToHomescreen from './AddToHomescreen';
import ShareMenu from './ShareMenu';

const AppNavigation = ({ info }) => (
  <Paper zDepth={1}>
    <Toolbar style={styles.toolbar}>
      <ToolbarGroup style={styles.toolbarGroup}>
        <AppInformationMenu {...info} />
        <NoSSR>
          <AddToHomescreen />
        </NoSSR>
        <NoSSR>
          <ShareMenu />
        </NoSSR>
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
