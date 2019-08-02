import React, { Fragment } from 'react';

// material-ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import NoSsr from '@material-ui/core/NoSsr';

// components
import ShareButton from './ShareButton';

const TitleBar = () => {
  const trigger = useScrollTrigger();

  return (
    <Fragment>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar>
          <Toolbar variant="dense">
            <Typography component="h1" variant="h6">
              DEUX TOURS シャトルバス
            </Typography>
            <NoSsr>
              <div style={{ flexGrow: 1 }} />
              <ShareButton />
            </NoSsr>
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar variant="dense" />
    </Fragment>
  );
};

export default TitleBar;
