import moment from 'moment';

export const momentFromVersion = (version) => {
  const year = parseInt((version / 10000) % 10000, 10);
  const month = parseInt((version / 100) % 100, 10) - 1;
  const day = parseInt(version % 100, 10);
  return moment({ year, month, day });
};

export const flattenTimeTable = timeTable => (
  timeTable.reduce((ret, { hour, minutes }) => {
    minutes.forEach((minute) => {
      const m = moment({ hour: hour % 24, minute });
      ret.push(hour >= 24 ? m.add(1, 'day') : m);
    });
    return ret;
  }, [])
);

export const findNextTime = (list, now) => {
  const currentTime = moment(now || moment());
  if (currentTime.hours() < 4) { currentTime.add(1, 'day'); }
  return list.find(m => (m.diff(currentTime) >= 0));
};

export default {
  momentFromVersion,
  flattenTimeTable,
  findNextTime,
};
