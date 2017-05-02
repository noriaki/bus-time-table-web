import React from 'react';
import moment from 'moment';

const RemainingClock = ({ remaining, time, dest }) => {
  if (remaining != null) {
    const m = moment.utc(remaining);
    const haveHour = m.hour() > 0;
    return (
      <div style={styles.container}>
        <div style={styles.boardContainer}>
          <div style={styles.departure}>
            {time.format('HH')}:{time.format('mm')}
            <Suffix str="発" />
          </div>
          <div style={styles.destination}>{dest}<Suffix str="行" /></div>
        </div>
        <div style={styles.timerContainer}>
          {haveHour ? <Hour m={m} /> : null}
          {haveHour ? <Suffix str="時間" /> : null}
          <Minute m={m} /><Suffix str="分" />
          <Second m={m} /><Suffix str="秒後" />
        </div>
      </div>
    );
  }
  return (
    <div style={styles.container}>
      <p style={styles.notice}>本日の{dest}行きバスは全て終了しました</p>
    </div>
  );
};

const Hour = ({ m }) => <span style={styles.timer}>{m.format('HH')}</span>;
const Minute = ({ m }) => <span style={styles.timer}>{m.format('mm')}</span>;
const Second = ({ m }) => <span style={styles.timer}>{m.format('ss')}</span>;
const Suffix = ({ str }) => <span style={styles.suffix}>{str}</span>;

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  boardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginRight: 5,
  },
  departure: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  destination: {
    marginLeft: 5,
    fontSize: 13,
  },
  timer: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  suffix: {
    fontSize: 10,
    fontWeight: 'normal',
  },
  notice: {
    fontSize: 13,
  },
};

export default RemainingClock;
