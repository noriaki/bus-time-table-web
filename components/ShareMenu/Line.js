import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import LineIcon from './icons/Line';

import GA from '../GA';

export const launchApp = () => {
  const url = 'https://deux-tours-bus.com';
  document.location.href = `line://msg/text/${encodeURIComponent(url)}`;
};

const Line = ({ onFinish }) => {
  const callback = () => {
    launchApp();
    setTimeout(onFinish, 300);
  };
  return (
    <ListItem button onClick={GA.share('LINE', callback)}>
      <ListItemIcon>
        <LineIcon />
      </ListItemIcon>
      <ListItemText primary="LINEで送る" />
    </ListItem>
  );
};

export default Line;
