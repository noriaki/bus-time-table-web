import React from 'react';

const LineItButton = () => (
  <img
    style={styles.lineButton}
    src="/static/images/line-share-a.png"
    alt="LINEで送る" />
);

export const handleTouchTap = () => {
  const url = 'https://deux-tours-bus.com';
  document.location.href = `line://msg/text/${encodeURIComponent(url)}`;
};

LineItButton.handleTouchTap = handleTouchTap;

export default LineItButton;

const styles = {
  lineButton: {
    width: 82,
    height: 20,
  },
};
