import React from 'react';
import NoSSR from 'react-no-ssr';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import ShareIcon from 'material-ui/svg-icons/social/share';

import LineItButton from './LineItButton';

const ShareMenu = () => (
  <IconMenu
    useLayerForClickAway
    iconButtonElement={MenuIcon}
    anchorOrigin={{ horizontal: 'middle', vertical: 'center' }}
    targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
    <Subheader>知人・友人に教える</Subheader>
    <MenuItem
      primaryText="LINE"
      secondaryText={<div><span style={styles.icon}><span style={styles.iconInner}><NoSSR><LineItButton /></NoSSR></span></span></div>} />
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
    height: 21,
    width: 21,
  },
  iconInner: {
    position: 'absolute',
    bottom: -5,
    height: 21,
    width: 21,
    lineHeight: '21px',
  },
};
