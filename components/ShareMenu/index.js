import React, { PureComponent } from 'react';
import MobileDetect from 'mobile-detect';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import Snackbar from 'material-ui/Snackbar';
import ShareIcon from 'material-ui-icons/Share';

// components
import Line from './Line';
import FacebookMessenger from './FacebookMessenger';
import URLCopy from './URLCopy';
import GA from '../GA';

const ShareListSubheader = () => (
  <ListSubheader>知人・友人へ共有</ListSubheader>
);

class ShareMenu extends PureComponent {
  state = {
    open: false,
    openSnackbar: false,
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

  handleCopyFinish = ({ notify } = {}) => {
    this.handleClose();
    if (notify) {
      setTimeout(() => this.setState({ openSnackbar: true }), 300);
    }
  }

  handleCloseSnackbar = () => this.setState({ openSnackbar: false })

  render() {
    const viewables = detectItemViewables();
    if (!viewables.self) { return null; }

    return (
      <div>
        <IconButton color="inherit" onClick={this.handleOpen}>
          <ShareIcon />
        </IconButton>
        <Drawer
          anchor="bottom"
          open={this.state.open}
          onClose={this.handleClose}>
          <List subheader={<ShareListSubheader />}>
            {viewables.line && <Line onFinish={this.handleClose} />}
            {viewables.fb && <FacebookMessenger onFinish={this.handleClose} />}
            {viewables.copy && <URLCopy onFinish={this.handleCopyFinish} />}
          </List>
        </Drawer>
        <Snackbar
          open={this.state.openSnackbar}
          onClose={this.handleCloseSnackbar}
          autoHideDuration={2000}
          SnackbarContentProps={{ 'aria-describedby': 'message-id' }}
          message={<span id="message-id">URLをコピーしました</span>} />
      </div>
    );
  }
}
export default ShareMenu;

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
