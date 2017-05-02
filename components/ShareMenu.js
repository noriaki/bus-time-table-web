import React from 'react';
import NoSSR from 'react-no-ssr';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import ShareIcon from 'material-ui/svg-icons/social/share';

import LineItButton from './LineItButton';
import FacebookSendButton from './FacebookSendButton';

const ShareMenu = () => (
  <IconMenu
    useLayerForClickAway
    iconButtonElement={MenuIcon}
    anchorOrigin={{ horizontal: 'middle', vertical: 'center' }}
    targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
    <Subheader>知人・友人に教える</Subheader>
    <MenuItem
      primaryText="LINE"
      secondaryText={Iconize(LineItButton, 'line')} />
    <MenuItem
      primaryText="Facebook"
      secondaryText={Iconize(FacebookSendButton, 'fb')} />
  </IconMenu>
);

export default ShareMenu;

const MenuIcon = (
  <IconButton touch tooltip="Share" tooltipPosition="top-left">
    <ShareIcon />
  </IconButton>
);

const styles = {
  icon: {
    display: 'inline-flex',
    alignSelf: 'center',
    position: 'relative',
    height: 20,
  },
  iconInner: {
    position: 'absolute',
    bottom: -5,
    height: 20,
    lineHeight: '20px',
  },
  line: {
    width: 84,
  },
  fb: {
    width: 49,
  },
};

const Iconize = (Component, name) => (
  <div>
    <span style={{ ...styles.icon, ...styles[name] }}>
      <span style={{ ...styles.iconInner, ...styles[name] }}>
        <NoSSR><Component /></NoSSR>
      </span>
    </span>
  </div>
);
