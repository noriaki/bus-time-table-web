import React, { Component } from 'react';
import browser from 'detect-browser';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import ActionGetApp from 'material-ui/svg-icons/action/get-app';

import AddToHomescreenDetail from './AddToHomescreenDetail';
import GA from './GA';

class AddToHomescreen extends Component {
  state = {
    open: false,
    visible: detectVisible(navigator),
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
    return (
      <div style={{ display: this.state.visible ? 'block' : 'none' }}>
        <FlatButton
          secondary
          icon={<ActionGetApp />}
          label="アプリ"
          labelStyle={styles.buttonLabel}
          style={styles.button}
          onTouchTap={this.handleTouchTap} />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
          onRequestClose={this.handleRequestClose}
          style={styles.popover}>
          <AddToHomescreenDetail />
        </Popover>
      </div>
    );
  }
}

const detectVisible = ({ standalone }) => {
  const isTargetBrowser = (
    browser != null && ['ios'].includes(browser.name)
  );
  return !standalone && isTargetBrowser;
};

const styles = {
  button: {
    margin: 0,
  },
  buttonLabel: {
    fontWeight: 'bold',
    paddingLeft: 4,
  },
  popover: {
    width: '90%',
    height: '75%',
    overflowY: 'scroll',
  },
};

export default AddToHomescreen;
