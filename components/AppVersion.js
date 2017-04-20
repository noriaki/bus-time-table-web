import React from 'react';
import { grey500 } from 'material-ui/styles/colors';

const AppVersion = ({ version }) => (
  <small style={styles.appVersion}>
    version {version}
  </small>
);

export default AppVersion;

const styles = {
  appVersion: {
    color: grey500,
    margin: 5,
    display: 'flex-item',
  },
};
