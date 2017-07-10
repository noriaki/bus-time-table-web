import React from 'react';
import { styled } from 'react-free-style';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import ShareIcon from 'material-ui/svg-icons/social/share';
import LinkIcon from 'material-ui/svg-icons/content/link';

import LineItButton, {
  launchApp as launchAppLine } from './LineItButton';
import FacebookSendButton, {
  launchApp as launchAppFb } from './FacebookSendButton';
import GA from './GA';

import copyToClipboard from '../libs/copyToClipboard';

import ShareMenuStyles, { icon, iconInner, copy } from '../styles/ShareMenu-Style';

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
      primaryText={<CopyTitle />}
      style={{ display: detectVisibleCP(navigator, os) ? 'block' : 'none' }}
      onTouchTap={handleTouchTapCopy}
      secondaryText={Iconize(LinkIcon, 'copy', { style: copy })} />
  </IconMenu>
);

export default ShareMenu;

const MenuIcon = (
  <IconButton touch tooltip="Share" tooltipPosition="top-left">
    <ShareIcon />
  </IconButton>
);

const CopyTitle = styled(ShareMenuStyles)(({ styles }) => (
  <div className={styles.copyTitle}>
    URLをコピー<br />
    <span id="appurl" className={styles.copyURL}>
      https://deux-tours-bus.com
    </span>
  </div>
));

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
  const ret = copyToClipboard(url);
  if (ret) {
    GA.event({ category: 'Share', action: 'copy', label: 'clipboard' });
  }
};

const Iconize = (Component, name, props = {}) => (
  <div>
    <span style={{ ...icon, ...ShareMenuStyles[name] }}>
      <span style={{ ...iconInner, ...ShareMenuStyles[name] }}>
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

const detectVisibleCP = (_, os) => {
  const isTargetBrowser = ['AndroidOS', 'iOS'].includes(os);
  return isTargetBrowser;
};
