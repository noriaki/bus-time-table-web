import React from 'react';
import NewIcon from 'material-ui/svg-icons/av/fiber-new';

import { blueSky } from '../themes/colors';

const ChangeLogInfo = ({ logs }) => (
  <div>
    <p style={styles.noteText}>
      いつもご利用ありがとうございます。<br />
      本アプリの使い勝手などで気になるところがあれば、メニューからお気軽にお問い合わせください。<br />
      また、よかったらお知り合いにも画面右下の共有メニューから教えてあげてくださいね。
    </p>
    <h2 style={styles.containerHeader}>更新履歴</h2>
    {logs.map(buildChangeLogsContent)}
  </div>
);

const buildChangeLogsContent = ({ version, date, subjects }, index) => (
  <section key={version} style={styles.section}>
    <h1 style={styles.header}>
      {index === 0 ? <span style={styles.icon}><NewIcon color={blueSky} style={styles.svg} /></span> : null}
      {date}
      <small style={styles.version}>{version.replace('v', 'バージョン')}</small>
    </h1>
    <ul>
      {subjects.map(buildChangeLogItem(version))}
    </ul>
  </section>
);

const buildChangeLogItem = version => subject => (
  <li key={`${version}-${subject}`} style={styles.subject}>{subject}</li>
);

export default ChangeLogInfo;

const styles = {
  section: {
    marginBottom: 32,
  },
  noteText: {
    fontSize: 11,
    lineHeight: 1.2,
  },
  containerHeader: {
    marginTop: '1.5em',
    fontSize: 18,
  },
  header: {
    fontSize: 16,
  },
  version: {
    marginLeft: 8,
    fontWeight: 'normal',
  },
  subject: {
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
