import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ContentCopyIcon from 'material-ui-icons/ContentCopy';

import copyToClipboard from '../../libs/copyToClipboard';
import GA from '../GA';

const URLCopy = ({ onFinish }) => (
  <ListItem button onClick={handleClick(onFinish)}>
    <ListItemIcon>
      <ContentCopyIcon />
    </ListItemIcon>
    <ListItemText
      primary="URLをコピー"
      secondary="https://deux-tours-bus.com" />
  </ListItem>
);
URLCopy.propTypes = {
  onFinish: PropTypes.func.isRequired,
};

export default URLCopy;

const handleClick = onFinish => () => {
  const url = 'https://deux-tours-bus.com';
  const ret = copyToClipboard(url);
  if (ret) {
    let isCallbacked = false;
    const callback = () => {
      if (isCallbacked) { return; }
      isCallbacked = true;
      onFinish({ notify: true });
    };
    GA.event({
      category: 'Share',
      action: 'copy',
      label: 'clipboard',
      callback,
    });
  } else { onFinish(); }
};
