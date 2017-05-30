import React from 'react';
import NewIcon from 'material-ui/svg-icons/av/fiber-new';

import { blueSky } from '../themes/colors';

const ChangeLogInfo = ({ logs }) => (
  <div>
    {logs.map(buildChangeLogsContent)}
  </div>
);

const buildChangeLogsContent = ({ version, date, subjects }, index) => (
  <section key={version} style={styles.section}>
    <h1 style={styles.header}>
      {index === 0 ? <span style={styles.icon}><NewIcon color={blueSky} style={styles.svg} /></span> : null}
      {date}
      <small style={styles.v}>{version.replace('v', 'バージョン')}</small>
    </h1>
    <ul>
      {subjects.map(s => <li key={`${version}-${s}`} style={styles.s}>{s}</li>)}
    </ul>
  </section>
);

export default ChangeLogInfo;

const styles = {
  section: {
    marginBottom: 32,
  },
  header: {
    fontSize: 16,
  },
  v: {
    marginLeft: 8,
    fontWeight: 'normal',
  },
  s: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: '1.4',
  },
  icon: {
    display: 'inline-flex',
    alignSelf: 'center',
    position: 'relative',
    height: '1.4em',
    width: '1.4em',
    marginRight: '0.3em',
  },
  svg: {
    color: 'inherit',
    height: '1.4em',
    width: '1.4em',
    position: 'absolute',
    bottom: '-0.3em',
  },
};
