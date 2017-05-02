import React, { Component } from 'react';

export default class extends Component {
  static init = () => {
    FB.XFBML.parse();
    FB.AppEvents.logPageView();
  }

  componentDidMount() {
    /* eslint-disable */
    (function(w,d,appId,s,r,f,id,e,m) {
      if (d.getElementById(id)) { return; }
      w['fbAsyncInit'] = function() {
        FB.init({ appId, xfbml: false, version: 'v2.9' });
      };
      e=d.createElement('script'),m=d.getElementById(r);
      e.async=1;e.id=id;e.src=f;m.parentNode.insertBefore(e,m.nextSibling);
    })(
      window,document,this.props.appId,
      'script','fb-root','//connect.facebook.net/ja_JP/sdk.js','facebook-jssdk'
    );
    /* eslint-enable */
  }

  render() { return <div id="fb-root" />; }
}
