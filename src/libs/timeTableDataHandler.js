import dayjs from 'dayjs';

import holidays from '~/data/holidays.json';
import suspensionDays from '~/data/suspension.json';

export const offset = '+09:00';
export const timeShift = 4;

export const momentFromVersion = (version) => {
  const year = parseInt((version / 10000) % 10000, 10);
  const month = parseInt((version / 100) % 100, 10) - 1;
  const day = parseInt(version % 100, 10);
  return dayjs({ year, month, day }).utcOffset(offset);
};

export const flattenTimeTable = (timeTable, now) => {
  const currentTime = now || Date.now();
  return timeTable.reduce((ret, { hour, minutes }) => {
    (minutes || []).forEach((minute) => {
      ret.push(
        dayjs(currentTime)
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
  const currentTime = dayjs(now || Date.now()).utcOffset(offset);
  return list.findIndex(m => (m.diff(currentTime) >= 0));
};

export const sliceNextTimeList = (list, now) => {
  const index = findNextTimeIndex(list, now);
  if (index !== -1) { return list.slice(index); }
  return [];
};

export const isInactiveDays = (activeDays, now) => {
  const currentTime = dayjs(now || Date.now()).utcOffset(offset);
  if (currentTime.hours() < timeShift) { currentTime.subtract(1, 'day'); }
  return (
    !activeDays.includes(currentTime.day())
      || holidays[currentTime.format('YYYY-MM-DD')] !== undefined
  );
};

export const isSuspended = (now) => {
  const currentTime = dayjs(now || Date.now()).utcOffset(offset);
  if (currentTime.hours() < timeShift) { currentTime.subtract(1, 'day'); }
  const result = suspensionDays.find((suspension) => (
    currentTime.isBetween(suspension.start, suspension.end, 'day', '[]')
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
