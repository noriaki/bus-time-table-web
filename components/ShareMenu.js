import React from 'react';
import copy from 'copy-to-clipboard';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import ShareIcon from 'material-ui/svg-icons/social/share';
import CopyIcon from 'material-ui/svg-icons/content/content-copy';

import LineItButton, {
  launchApp as launchAppLine } from './LineItButton';
import FacebookSendButton, {
  launchApp as launchAppFb } from './FacebookSendButton';
import GA from './GA';

const ShareMenu = ({ os }) => (
  <IconMenu
    useLayerForClickAway
    style={{ display: detectVisible(navigator, os) ? 'block' : 'none' }}
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
      style={{ display: detectVisibleFB(navigator, os) ? 'block' : 'none' }}
      onTouchTap={handleTouchTapSocial('Facebook', launchAppFb)}
      secondaryText={Iconize(FacebookSendButton, 'fb')} />
    <MenuItem
      primaryText="URLをコピー"
      style={{ display: detectVisibleCP(navigator, os) ? 'block' : 'none' }}
      onTouchTap={handleTouchTapCopy}
      secondaryText={Iconize(CopyIcon, 'copy', { style: styles.copy })} />
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

const handleTouchTapCopy = () => {
  const url = 'https://deux-tours-bus.com';
  const message = 'URLを選択してコピーしてください';
  new Promise(resolve => GA.event({
    category: 'Share', action: 'copy', label: 'clipboard', callback: resolve,
  })).then(() => copy(url, { message }));
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
  copy: {
    width: 20,
    height: 20,
  },
};

const Iconize = (Component, name, props = {}) => (
  <div>
    <span style={{ ...styles.icon, ...styles[name] }}>
      <span style={{ ...styles.iconInner, ...styles[name] }}>
        <Component {...props} />
      </span>
    </span>
  </div>
);

const detectVisible = ({ standalone }, os) => {
  const isTargetBrowser = ['AndroidOS', 'iOS'].includes(os);
  return standalone != null || isTargetBrowser;
};

const detectVisibleFB = ({ standalone }, os) => {
  const isTargetBrowser = ['iOS'].includes(os);
  return standalone != null || isTargetBrowser;
};

const detectVisibleCP = ({ standalone }, os) => {
  const isTargetBrowser = ['AndroidOS'].includes(os);
  return standalone != null || isTargetBrowser;
};
