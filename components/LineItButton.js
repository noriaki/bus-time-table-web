import React from 'react';
import { styled } from 'react-free-style';

import LineItButtonStyles from '../styles/LineItButton-Style';

const LineItButton = ({ styles }) => (
  <img
    className={styles.lineButton}
    src="/static/images/line-share-a.png"
    alt="LINEで送る" />
);

export default styled(LineItButtonStyles)(LineItButton);

export const launchApp = () => {
  const url = 'https://deux-tours-bus.com';
  document.location.href = `line://msg/text/${encodeURIComponent(url)}`;
};
