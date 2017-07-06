import React from 'react';
import { styled } from 'react-free-style';

// components
import ChangeLogInfoContent from './ChangeLogInfoContent';

// styles
import ChangeLogInfoStyles from '../styles/ChangeLogInfo-Style';

const ChangeLogInfo = ({ logs, styles }) => (
  <div>
    <p className={styles.noteText}>
      いつもご利用ありがとうございます。<br />
      本アプリの使い勝手などで気になるところがあれば、メニューからお気軽にお問い合わせください。<br />
      また、よかったらお知り合いにも画面右下の共有メニューから教えてあげてくださいね。
    </p>
    <h2 className={styles.containerHeader}>更新履歴</h2>
    {logs.map(buildChangeLogsContent)}
  </div>
);

const buildChangeLogsContent = (log, index) => {
  const isFirst = index === 0;
  return <ChangeLogInfoContent key={index} isFirst={isFirst} {...log} />;
};

export default styled(ChangeLogInfoStyles)(ChangeLogInfo);
