import React from 'react';
import NoSSR from 'react-no-ssr';
import browser from 'detect-browser';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import ShareIcon from 'material-ui/svg-icons/social/share';

import LineItButton, {
  launchApp as launchAppLine } from './LineItButton';
import FacebookSendButton, {
  launchApp as launchAppFb } from './FacebookSendButton';
import GA from './GA';

const ShareMenu = () => (
  <IconMenu
    useLayerForClickAway
    style={{ display: detectVisible(navigator) ? 'block' : 'none' }}
    iconButtonElement={MenuIcon}
    onTouchTap={handleTouchTap}
    anchorOrigin={{ horizontal: 'middle', vertical: 'center' }}
    targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
    <Subheader>知人・友人に共有</Subheader>
    <MenuItem
      primaryText="LINE"
      onTouchTap={handleTouchTapSocial('LINE', launchAppLine)}
      secondaryText={Iconize(LineItButton, 'line')} />
    <MenuItem
      primaryText="Facebook"
      onTouchTap={handleTouchTapSocial('Facebook', launchAppFb)}
      secondaryText={Iconize(FacebookSendButton, 'fb')} />
  </IconMenu>
);

export default ShareMenu;

const MenuIcon = (
  <IconButton touch tooltip="Share" tooltipPosition="top-left">
    <ShareIcon />
  </IconButton>
);

const handleTouchTap = () => GA.pageview({
  title: '知人・友人に共有',
  page: '/popups/share-this-app',
});

const handleTouchTapSocial = (network, callback = () => {}) => () => {
  const url = 'https://deux-tours-bus.com';
  Promise.all([new Promise(resolve => GA.social({
    network, action: 'send', url, callback: resolve,
  })), new Promise(resolve => GA.event({
    category: 'Share', action: 'send', label: network, callback: resolve,
  }))]).then(callback);
};

const styles = {
  icon: {
    display: 'inline-flex',
    alignSelf: 'center',
    position: 'relative',
    height: 20,
  },
  iconInner: {
    position: 'absolute',
    bottom: -4,
    height: 20,
    lineHeight: '20px',
  },
  line: {
    width: 82,
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

const detectVisible = ({ standalone }) => {
  const isTargetBrowser = (
    browser != null && ['ios'].includes(browser.name)
  );
  return standalone != null || isTargetBrowser;
};
