import React, { Component } from 'react';
import MobileDetect from 'mobile-detect';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import ShareIcon from 'material-ui-icons/Share';

import Line from './Line';
import FacebookMessenger from './FacebookMessenger';
import URLCopy from './URLCopy';
import GA from '../GA';

import ShareMenuStyles from '../../styles/ShareMenu-Style';

const ShareListSubheader = () => (
  <ListSubheader>知人・友人へ共有</ListSubheader>
);

class ShareMenu extends Component {
  state = {
    open: false,
    previousPage: null,
  }

  handleOpen = () => {
    const previousPage = GA.gets('page', 'title');
    GA.pageview({
      title: '知人・友人へ共有',
      page: '/screens/share-this-app',
    });
    this.setState({
      open: true,
      previousPage,
    });
  }

  handleClose = () => {
    GA.pageview(this.state.previousPage);
    this.setState({
      open: false,
      previousPage: null,
    });
  }

  render() {
    const viewables = detectItemViewables();
    if (!viewables.self) { return null; }

    return (
      <div>
        <IconButton
          color="contrast"
          onClick={this.handleOpen}>
          <ShareIcon />
        </IconButton>
        <Drawer
          anchor="bottom"
          open={this.state.open}
          onRequestClose={this.handleClose}>
          <List subheader={<ShareListSubheader />}>
            {viewables.line ? <Line onFinish={this.handleClose} /> : null}
            {viewables.fb ? <FacebookMessenger onFinish={this.handleClose} /> : null}
            {viewables.copy ? <URLCopy onFinish={this.handleClose} /> : null}
          </List>
        </Drawer>
      </div>
    );
  }
}
export default withStyles(ShareMenuStyles)(ShareMenu);

export const detectItemViewables = () => {
  const { standalone, userAgent } = global.navigator;
  const isStandalone = standalone != null ||
    /display=standalone/.test(document.location.search);
  const os = (new MobileDetect(userAgent)).os();
  return {
    self: (isStandalone || ['AndroidOS', 'iOS'].includes(os)),
    line: ['AndroidOS', 'iOS'].includes(os),
    fb: (isStandalone || os === 'iOS'),
    copy: ['AndroidOS', 'iOS'].includes(os),
  };
};
