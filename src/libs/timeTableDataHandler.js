import moment from 'moment';

import holidays from '~/data/holidays.json';
import suspensionDays from '~/data/suspension.json';

const offset = '+09:00';
const timeShift = 4;

export const momentFromVersion = (version) => {
  const year = parseInt((version / 10000) % 10000, 10);
  const month = parseInt((version / 100) % 100, 10) - 1;
  const day = parseInt(version % 100, 10);
  return moment({ year, month, day }).utcOffset(offset);
};

export const flattenTimeTable = (timeTable, now) => {
  const currentTime = now || Date.now();
  return timeTable.reduce((ret, { hour, minutes }) => {
    (minutes || []).forEach((minute) => {
      ret.push(
        moment(currentTime)
          .utcOffset(offset)
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
  const currentTime = moment(now || Date.now()).utcOffset(offset);
  return list.findIndex(m => (m.diff(currentTime) >= 0));
};

export const sliceNextTimeList = (list, now) => {
  const index = findNextTimeIndex(list, now);
  if (index !== -1) { return list.slice(index); }
  return [];
};

export const isInactiveDays = (activeDays, now) => {
  const currentTime = moment(now || Date.now()).utcOffset(offset);
  if (currentTime.hours() < timeShift) { currentTime.subtract(1, 'day'); }
  return (
    !activeDays.includes(currentTime.day())
      || holidays[currentTime.format('YYYY-MM-DD')] !== undefined
  );
};

export const isSuspended = (now) => {
  const currentTime = moment(now || Date.now()).utcOffset(offset);
  if (currentTime.hours() < timeShift) { currentTime.subtract(1, 'day'); }
  const result = suspensionDays.find((suspension) => (
    currentTime.isBetween(suspension.start, suspension.end, null, '[]')
  ));
  if (result == null) { return { result: false, reason: {} }; }
  const { title, subtitle } = result;
  return { result: true, reason: { title, subtitle } };
};

export default {
  momentFromVersion,
  flattenTimeTable,
  findNextTime,
  isInactiveDays,
  isSuspended,
};
