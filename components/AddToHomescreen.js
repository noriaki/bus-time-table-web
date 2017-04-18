import React, { Component } from 'react';
import browser from 'detect-browser';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import ActionGetApp from 'material-ui/svg-icons/action/get-app';

import AddToHomescreenDetail from './AddToHomescreenDetail';

class AddToHomescreen extends Component {
  state = {
    open: false,
    visible: detectVisible(navigator),
  }

  handleTouchTap = (e) => {
    // This prevents ghost click.
    e.preventDefault();
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
      <div style={{ ...styles.container, ...(this.state.visible ? { display: 'block' } : { display: 'none' }) }}>
        <RaisedButton
          secondary
          icon={<ActionGetApp />}
          label="アプリ"
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
  container: {
    position: 'absolute',
    bottom: 24,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  popover: {
    width: '90%',
    height: '75%',
    overflowY: 'scroll',
  },
};

export default AddToHomescreen;
