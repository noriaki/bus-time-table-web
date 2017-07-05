import React from 'react';
import moment from 'moment';
import { styled } from 'react-free-style';

// styles
import RemainingClockStyles from '../styles/RemainingClock-Style';

const RemainingClock = ({ remaining, time, dest, inactive, styles }) => {
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
  } else if (remaining != null) {
    const m = moment.utc(remaining);
    const haveHour = m.hour() > 0;
    const hour = <span className={styles.timer}>{m.format('HH')}</span>;
    const minute = <span className={styles.timer}>{m.format('mm')}</span>;
    const second = <span className={styles.timer}>{m.format('ss')}</span>;
    return (
      <div className={styles.container}>
        <div className={styles.boardContainer}>
          <div className={styles.departure}>
            {time.format('HH')}:{time.format('mm')}
            <span className={styles.suffix}>発</span>
          </div>
          <div className={styles.destination}>
            {dest}<span className={styles.suffix}>行</span></div>
        </div>
        <div className={styles.timerContainer}>
          {haveHour ? hour : null}
          {haveHour ? <span className={styles.suffix}>時間</span> : null}
          {minute}<span className={styles.suffix}>分</span>
          {second}<span className={styles.suffix}>秒後</span>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <p className={styles.notice}>本日の{dest}行きバスは全て終了しました</p>
    </div>
  );
};

export default styled(RemainingClockStyles)(RemainingClock);
