import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';

import SvgIcon from 'material-ui/SvgIcon';
import OrgNavigationMenuIcon from 'material-ui/svg-icons/navigation/menu';
import OpenInNewIcon from 'material-ui/svg-icons/action/open-in-new';

import { blueSky } from '../themes/colors';

import changelogs from '../data/changelogs.json';
import ChangeLogInfo from './ChangeLogInfo';
import GA from './GA';

class AppInformationMenu extends Component {
  state = { menuOpen: false, infoOpen: false, badge: false }

  handleOpenMenu = () => {
    GA.event({
      category: 'Menu',
      action: 'open',
    });
    this.setState({ ...this.state, menuOpen: true });
  }
  handleRequestChangeMenu = (menuOpen) => {
    const nextState = { menuOpen };
    if (!menuOpen) { nextState.badge = false; }
    this.setState({ ...this.state, ...nextState });
  }
  handleOpenInfo = () => {
    GA.pageview({
      title: 'アプリのお知らせ',
      page: '/popups/info-of-this-app',
    });
    this.setState({ ...this.state, infoOpen: true });
  }
  handleClose = () => this.setState({
    ...this.state, menuOpen: false, infoOpen: false, badge: false,
  })

  render() {
    const { timeTableVersion, appVersion } = this.props;
    const { menuOpen, infoOpen, badge } = this.state;
    return (
      <div>
        <IconButton
          touch
          tooltip="About"
          tooltipPosition="top-right"
          onTouchTap={this.handleOpenMenu}>
          <NavigationMenuIcon badge={badge} />
        </IconButton>
        <Drawer
          docked={false}
          disableSwipeToOpen
          open={menuOpen}
          onRequestChange={this.handleRequestChangeMenu}>
          <Subheader>このアプリについて</Subheader>
          <Divider />
          <MenuItem
            primaryText="お知らせ（更新情報）"
            rightIcon={badge ? <NotificationIcon /> : null}
            onTouchTap={this.handleOpenInfo} />
          <Divider />
          <MenuItem
            primaryText="時刻表更新日"
            secondaryText={timeTableVersion} />
          <MenuItem
            primaryText="アプリバージョン"
            secondaryText={appVersion} />
          <Divider />
          <MenuItem
            secondaryText={LinkOpenInNew({ url: 'https://goo.gl/forms/uqot48HEr7AqgnOV2', text: '要望・不具合の問い合わせ' })} />
          <MenuItem
            primaryText="Author (c) 2017"
            secondaryText={LinkOpenInNew({ url: 'https://twitter.com/noriaki', text: '@noriaki' })} />
          <MenuItem
            primaryText="Icon made by"
            secondaryText={LinkOpenInNew({ url: 'http://www.freepik.com', text: 'Freepik' })} />
          <Divider />
          <Dialog
            title="お知らせ"
            autoScrollBodyContent
            contentStyle={styles.infoDialog}
            actions={[<FlatButton label="閉じる" secondary onTouchTap={this.handleClose} />]}
            open={infoOpen}
            onRequestClose={this.handleClose}>
            <ChangeLogInfo logs={changelogs} />
          </Dialog>
        </Drawer>
      </div>
    );
  }
}

export default AppInformationMenu;

const NavigationMenuIcon = ({ badge, ...props }) => (
  badge ? (
    <SvgIcon {...props}>
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
      <circle cx={20} cy={4} r={6} fill="rgb(232, 232, 232)" />
      <circle cx={20} cy={4} r={4} fill={blueSky} />
    </SvgIcon>
  ) : <OrgNavigationMenuIcon {...props} />
);

const NotificationIcon = props => (
  <SvgIcon {...props}>
    <circle cx={12} cy={12} r={7} fill="rgb(232, 232, 232)" />
    <circle cx={12} cy={12} r={5} fill={blueSky} />
  </SvgIcon>
);

const LinkOpenInNew = ({ url, text }) => (
  <span style={styles.linkOpenInNewContainer}>
    <a href={url} target="_blank" rel="noopener noreferrer">{text}</a>
    <span style={styles.icon}><OpenInNewIcon style={styles.svg} /></span>
  </span>
);

const styles = {
  smallMenuIcon: {
    fontSize: 12,
  },
  infoDialog: {
    width: '96%',
    maxWidth: 'none',
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
