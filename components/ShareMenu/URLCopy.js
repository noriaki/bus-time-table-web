import React, { Component } from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Snackbar from 'material-ui/Snackbar';
import ContentCopyIcon from 'material-ui-icons/ContentCopy';

import copyToClipboard from '../../libs/copyToClipboard';
import GA from '../GA';

class URLCopy extends Component {
  state = {
    openSnackbar: false,
  }

  handleClick = () => {
    const url = 'https://deux-tours-bus.com';
    const ret = copyToClipboard(url);
    if (ret) {
      this.setState({ openSnackbar: true });
      GA.event({
        category: 'Share',
        action: 'copy',
        label: 'clipboard',
        callback: () => setTimeout(this.props.onFinish, 1300),
      });
    }
  }

  handleCloseSnackbar = () => this.setState({ openSnackbar: false })

  render() {
    return (
      <ListItem button onClick={this.handleClick}>
        <ListItemIcon>
          <ContentCopyIcon />
        </ListItemIcon>
        <ListItemText
          primary="URLをコピー"
          secondary="https://deux-tours-bus.com" />
        <Snackbar
          open={this.state.openSnackbar}
          onClose={this.handleCloseSnackbar}
          SnackbarContentProps={{ 'aria-describedby': 'message-id' }}
          message={<span id="message-id">URLをコピーしました</span>} />
      </ListItem>
    );
  }
}

export default URLCopy;
