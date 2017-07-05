import React from 'react';
import { styled } from 'react-free-style';
import NewIcon from 'material-ui/svg-icons/av/fiber-new';

import { blueSky } from '../themes/colors';
import { icon, svg } from '../styles/HorizontallyIcons-Style';
import ChangeLogInfoContentStyles from '../styles/ChangeLogInfoContent-Style';

const ChangeLogInfoContent = ({ version, date, subjects, isFirst, styles }) => {
  const versionStr = version.replace('v', 'バージョン');
  const newIcon = (
    <span style={{ ...icon, marginRight: '0.3em' }}>
      <NewIcon color={blueSky} style={svg} />
    </span>
  );
  return (
    <section key={version} className={styles.section}>
      <h1 className={styles.header}>
        {isFirst ? newIcon : null}
        {date}
        <small className={styles.version}>{versionStr}</small>
      </h1>
      <ul>
        {subjects.map(buildChangeLogItem({ version, styles }))}
      </ul>
    </section>
  );
};

const buildChangeLogItem = ({ version, styles }) => subject => (
  <li key={`${version}-${subject}`} className={styles.subject}>{subject}</li>
);

export default styled(ChangeLogInfoContentStyles)(ChangeLogInfoContent);
