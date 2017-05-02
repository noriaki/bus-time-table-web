import React, { Component } from 'react';
import FBSDK from './FBSDK';

class FacebookSendButton extends Component {
  componentDidMount() { FBSDK.init(); }
  render() {
    return <div className="fb-send" data-href="https://deux-tours-bus.com" />;
  }
}

export default FacebookSendButton;
