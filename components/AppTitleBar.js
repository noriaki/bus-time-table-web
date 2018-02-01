import React from 'react';
import NoSSR from 'react-no-ssr';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import ShareMenu from './ShareMenu';

const AppTitleBar = ({ title }) => (
  <AppBar>
    <Toolbar>
      <Typography type="title" color="inherit" style={{ flexGrow: 1 }}>
        {title}
      </Typography>
      <NoSSR>
        <ShareMenu />
      </NoSSR>
    </Toolbar>
  </AppBar>
);
AppTitleBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AppTitleBar;
