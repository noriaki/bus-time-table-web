import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import FacebookMessengerIcon from 'mdi-material-ui/FacebookMessenger';

import GA from '../GA';

export const launchApp = () => {
  const url = 'https://deux-tours-bus.com';
  const appId = '1418931418128232';
  document.location.href = 'fb-messenger://share?' +
    `link=${encodeURIComponent(url)}&` +
    `app_id=${encodeURIComponent(appId)}`;
};

const FacebookMessenger = ({ onFinish }) => {
  const callback = () => {
    launchApp();
    setTimeout(onFinish, 300);
  };
  return (
    <ListItem button onClick={GA.share('Facebook', callback)}>
      <ListItemIcon>
        <FacebookMessengerIcon />
      </ListItemIcon>
      <ListItemText primary="Facebookメッセンジャーで送る" />
    </ListItem>
  );
}

export default FacebookMessenger;
