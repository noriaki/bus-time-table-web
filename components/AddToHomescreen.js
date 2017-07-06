import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import ActionGetApp from 'material-ui/svg-icons/action/get-app';

import AddToHomescreenDetail from './AddToHomescreenDetail';
import GA from './GA';

// styles
import { button, buttonLabel, popover } from '../styles/AddToHomescreen-Style';

class AddToHomescreen extends Component {
  state = {
    open: false,
  }

  handleTouchTap = (e) => {
    // This prevents ghost click.
    e.preventDefault();
    GA.pageview({
      title: 'ホーム画面に追加する方法',
      page: '/popups/add-to-homescreen',
    });
    this.setState({
      open: true,
      anchorEl: e.currentTarget,
    });
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  }

  render() {
    const { os } = this.props;
    return (
      <div style={{ display: detectVisible(navigator, os) ? 'block' : 'none' }}>
        <FlatButton
          secondary
          icon={<ActionGetApp />}
          label="アプリ"
          labelStyle={buttonLabel}
          style={button}
          onTouchTap={this.handleTouchTap} />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
          onRequestClose={this.handleRequestClose}
          style={popover}>
          <AddToHomescreenDetail />
        </Popover>
      </div>
    );
  }
}

const detectVisible = ({ standalone }, os) => {
  const isTargetBrowser = ['iOS'].includes(os);
  return !standalone && isTargetBrowser;
};

export default AddToHomescreen;
