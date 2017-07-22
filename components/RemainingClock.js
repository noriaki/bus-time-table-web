import React from 'react';
import moment from 'moment';
import { styled } from 'react-free-style';

// styles
import RemainingClockStyles from '../styles/RemainingClock-Style';

export const RemainingClock = (
  { dest, ended, inactive, remaining, time, styles }
) => {
  if (inactive) {
    return (
      <div className={styles.container}>
        <p className={styles.notice}>
          本日のシャトルバス運行はありません
          <br />
          （運行は土日祝祭日を除く平日のみ）
        </p>
      </div>
    );
  } else if (ended) {
    return (
      <div className={styles.container}>
        <p className={styles.notice}>本日の{dest}行きバスは全て終了しました</p>
      </div>
    );
  }
  const m = moment.utc(remaining);
  const haveHour = m.hour() > 0;
  const hour = <span className={styles.timer}>{m.format('HH')}</span>;
  const minute = <span className={styles.timer}>{m.format('mm')}</span>;
  const second = <span className={styles.timer}>{m.format('ss')}</span>;
  const suffix = s => <span className={styles.suffix}>{s}</span>;
  return (
    <div className={styles.container}>
      <div className={styles.boardContainer}>
        <div className={styles.departure}>
          {moment(time).format('HH:mm')}{suffix('発')}
        </div>
        <div className={styles.destination}>
          {dest}{suffix('行')}
        </div>
      </div>
      <div className={styles.timerContainer}>
        {haveHour ? hour : null}
        {haveHour ? suffix('時間') : null}
        {minute}{suffix('分')}
        {second}{suffix('秒後')}
      </div>
    </div>
  );
};

export default styled(RemainingClockStyles)(RemainingClock);
