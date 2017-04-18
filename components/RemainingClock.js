import React from 'react';
import moment from 'moment';

const RemainingClock = ({ remaining }) => {
  if (remaining != null) {
    const m = moment.utc(remaining);
    const haveHour = m.valueOf() >= 60 * 60 * 1000;
    return (
      <div style={styles.container}>
        <span>次のバス発車まで</span>
        {haveHour ? <Hour m={m} /> : null}
        {haveHour ? <Suffix str="時間" /> : null}
        <Minute m={m} /><Suffix str="分" />
        <Second m={m} /><Suffix str="秒" />
      </div>
    );
  }
  return (
    <div style={styles.container}>
      本日のバスは全て終了しました
    </div>
  );
};

const Hour = ({ m }) => <span style={styles.timer}>{m.format('HH')}</span>;
const Minute = ({ m }) => <span style={styles.timer}>{m.format('mm')}</span>;
const Second = ({ m }) => <span style={styles.timer}>{m.format('ss')}</span>;
const Suffix = ({ str }) => <span style={styles.suffix}>{str}</span>;

const styles = {
  container: {
    margin: 10,
    textAlign: 'center',
  },
  timer: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  suffix: {
    fontSize: 10,
  },
};

export default RemainingClock;
