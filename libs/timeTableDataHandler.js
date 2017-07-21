import moment from 'moment';

import holidays from '../data/holidays.json';

export const momentFromVersion = (version) => {
  const year = parseInt((version / 10000) % 10000, 10);
  const month = parseInt((version / 100) % 100, 10) - 1;
  const day = parseInt(version % 100, 10);
  return moment({ year, month, day });
};

export const flattenTimeTable = (timeTable, now) => {
  const currentTime = now || moment();
  return timeTable.reduce((ret, { hour, minutes }) => {
    (minutes || []).forEach((minute) => {
      const schedule = moment(currentTime)
              .subtract(4, 'hours')
              .set({ hour: hour - 4, minute, second: 0, millisecond: 0 })
              .add(4, 'hours');
      ret.push(schedule);
    });
    return ret;
  }, []);
};

export const findNextTime = (list, now) => {
  const currentTime = moment(now || moment());
  return list.find(m => (m.diff(currentTime) >= 0));
};

export const isInactiveDays = (activeDays, now) => {
  const currentTime = moment(now || moment());
  if (currentTime.hours() < 4) { currentTime.subtract(1, 'day'); }
  return (
    !activeDays.includes(currentTime.day())
      || holidays[currentTime.format('YYYY-MM-DD')] !== undefined
  );
};

export default {
  momentFromVersion,
  flattenTimeTable,
  findNextTime,
  isInactiveDays,
};
