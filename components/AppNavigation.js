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
