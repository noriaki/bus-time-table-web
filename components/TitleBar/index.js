import React from 'react';

// material-ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import NoSsr from '@material-ui/core/NoSsr';
import IconButton from '@material-ui/core/IconButton';

// material-icon
import BackIcon from '@material-ui/icons/ArrowBackIosOutlined';

// components
import Link from '~/components/NextLinkComposed';
import ShareButton from './ShareButton';

const TitleBar = ({ backTo }) => {
  const trigger = useScrollTrigger();

  const backButton = backTo != null ? (
    <IconButton
      edge="start"
      component={Link}
      naked
      href={backTo}
      color="inherit"
      aria-label="back">
      <BackIcon />
    </IconButton>
  ) : null;

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar>
          <Toolbar variant="dense">
            { backButton }
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
    </>
  );
};

export default TitleBar;
