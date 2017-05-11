import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';

import InfoOutlineIcon from 'material-ui/svg-icons/action/info-outline';
import OpenInNewIcon from 'material-ui/svg-icons/action/open-in-new';

import GA from './GA';

const AppInformationMenu = ({ timeTableVersion, appVersion }) => (
  <IconMenu
    useLayerForClickAway
    autoWidth
    iconButtonElement={MenuIcon}
    onTouchTap={handleTouchTap}
    anchorOrigin={{ horizontal: 'middle', vertical: 'center' }}
    targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}>
    <Subheader>このアプリについて</Subheader>
    <SmallMenuItem
      primaryText="時刻表更新日"
      secondaryText={timeTableVersion} />
    <SmallMenuItem
      primaryText="アプリバージョン"
      secondaryText={appVersion} />
    <SmallMenuItem
      primaryText="Author (c) 2017"
      secondaryText={LinkOpenInNew({ url: 'https://twitter.com/noriaki', text: '@noriaki' })} />
    <SmallMenuItem
      secondaryText={LinkOpenInNew({ url: 'https://goo.gl/forms/uqot48HEr7AqgnOV2', text: '要望・不具合の問い合わせ' })} />
    <SmallMenuItem
      primaryText="Icon made by"
      secondaryText={LinkOpenInNew({ url: 'http://www.freepik.com', text: 'Freepik' })} />
  </IconMenu>
);

export default AppInformationMenu;

const SmallMenuItem = props => (
  <MenuItem style={styles.smallMenuIcon} {...props} />
);

const MenuIcon = (
  <IconButton touch tooltip="About" tooltipPosition="top-right">
    <InfoOutlineIcon />
  </IconButton>
);

const LinkOpenInNew = ({ url, text }) => (
  <span style={styles.linkOpenInNewContainer}>
    <a href={url} target="_blank" rel="noopener noreferrer">{text}</a>
    <span style={styles.icon}><OpenInNewIcon style={styles.svg} /></span>
  </span>
);

const handleTouchTap = () => GA.pageview({
  title: 'このアプリについて',
  page: '/popups/about-this-app',
});

const styles = {
  smallMenuIcon: {
    fontSize: 12,
  },
  icon: {
    display: 'inline-flex',
    alignSelf: 'center',
    position: 'relative',
    height: '1.4em',
    width: '1.4em',
    marginLeft: '0.3em',
  },
  svg: {
    color: 'inherit',
    height: '1.4em',
    width: '1.4em',
    position: 'absolute',
    bottom: '-0.3em',
  },
};
