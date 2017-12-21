import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ContentCopyIcon from 'material-ui-icons/ContentCopy';

import copyToClipboard from '../../libs/copyToClipboard';
import GA from '../GA';

export const handleClick = () => {
  const url = 'https://deux-tours-bus.com';
  const ret = copyToClipboard(url);
  if (ret) {
    GA.event({ category: 'Share', action: 'copy', label: 'clipboard' });
  }
};

const URLCopy = () => (
  <ListItem button onClick={handleClick}>
    <ListItemIcon>
      <ContentCopyIcon />
    </ListItemIcon>
    <ListItemText
      primary="URLをコピー"
      secondary="https://deux-tours-bus.com" />
  </ListItem>
);

export default URLCopy;
