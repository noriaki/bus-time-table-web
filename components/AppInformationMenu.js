import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import InfoOutlineIcon from 'material-ui/svg-icons/action/info-outline';

const AppInformationMenu = ({ timeTableVersion, appVersion }) => (
  <IconMenu
    useLayerForClickAway
    autoWidth={false}
    width={188}
    iconButtonElement={MenuIcon}
    anchorOrigin={{ horizontal: 'middle', vertical: 'center' }}
    targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}>
    <Subheader>このアプリについて</Subheader>
    <SmallMenuItem
      primaryText="時刻表更新日"
      secondaryText={timeTableVersion} />
    <SmallMenuItem
      primaryText="アプリバージョン"
      secondaryText={appVersion} />
    <SmallMenuIcon
      primaryText="アプリ作者"
      secondaryText={<a href="https://twitter.com/noriaki">@noriaki</a>} />
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

const styles = {
  smallMenuIcon: {
    fontSize: 12,
  },
};
