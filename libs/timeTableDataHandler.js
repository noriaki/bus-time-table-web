import moment from 'moment';

import holidays from '~/data/holidays.json';

const timeShift = 4;

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
      ret.push(
        moment(currentTime)
          .subtract(timeShift, 'hours')
          .set({
            hour: hour - timeShift,
            minute,
            second: 0,
            millisecond: 0,
          })
          .add(timeShift, 'hours')
      );
    });
    return ret;
  }, []);
};

export const findNextTime = (list, now) => (
  list[findNextTimeIndex(list, now)]
);

export const findNextTimeIndex = (list, now) => {
  const currentTime = moment(now || moment());
  return list.findIndex(m => (m.diff(currentTime) >= 0));
};

export const sliceNextTimeList = (list, now) => {
  const index = findNextTimeIndex(list, now);
  if (index !== -1) { return list.slice(index); }
  return [];
};

export const isInactiveDays = (activeDays, now) => {
  const currentTime = moment(now || moment());
  if (currentTime.hours() < timeShift) { currentTime.subtract(1, 'day'); }
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
