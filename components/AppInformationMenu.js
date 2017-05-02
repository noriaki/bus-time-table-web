import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import InfoOutlineIcon from 'material-ui/svg-icons/action/info-outline';

import GA from './GA';

const AppInformationMenu = ({ timeTableVersion, appVersion }) => (
  <IconMenu
    useLayerForClickAway
    autoWidth={false}
    width={188}
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
      primaryText="Icon made by"
      secondaryText={<a href="http://www.freepik.com">Freepik</a>} />
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

const handleTouchTap = () => GA.pageview({
  title: 'このアプリについて',
  page: '/popups/about-this-app',
});

const styles = {
  smallMenuIcon: {
    fontSize: 12,
  },
};
