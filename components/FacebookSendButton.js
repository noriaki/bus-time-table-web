import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';

const FbMsgIcon = props => (
  <SvgIcon {...props}>
    <path fill="white" d="M5.4743532,13.6041412 C6.2578121,13.8601407 7.10947545,14 8,14 C11.8662465,14 15,11.3637984 15,8.03240966 C15,4.70069681 11.8662465,2 8,2 C4.1337535,2 1,4.70069681 1,8.03240966 C1,9.70838442 1.79313872,11.2084105 3.07366666,12.2853409 L3.07366666,15.048 L5.4743532,13.6041412 Z M8.65733333,9.78033333 L6.934,8.005 L3.61466667,9.825 L7.254,5.99633333 L8.97733333,7.77133333 L12.2963333,5.95166667 L8.65733333,9.78033333 Z" />
  </SvgIcon>
);

const FacebookSendButton = () => (
  <div className="fb-send" style={styles.container}>
    <span style={styles.iconContainer}>
      <FbMsgIcon color="white" style={styles.icon} viewBox="0 0 16 16" />
    </span>
    <span style={styles.text}>送信</span>
  </div>
);

export const launchApp = () => {
  const url = 'https://deux-tours-bus.com';
  const appId = '1418931418128232';
  document.location.href = 'fb-messenger://share?' +
    `link=${encodeURIComponent(url)}&` +
    `app_id=${encodeURIComponent(appId)}`;
};

export default FacebookSendButton;

const styles = {
  container: {
    background: 'linear-gradient(#0084ff, #006fff)',
    textShadow: '0 -1px 0 #005ecf',
    borderRadius: '3px',
  },
  text: {
    color: '#ffffff',
    fontSize: 11,
    marginLeft: 6,
  },
  iconContainer: {
    display: 'inline-flex',
    alignSelf: 'center',
    position: 'relative',
    height: 14,
    width: 14,
  },
  icon: {
    position: 'absolute',
    bottom: -3,
    height: 14,
    width: 14,
    lineHeight: '14px',
    margin: '0 4px',
  },
};
