import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import objectSupport from 'dayjs/plugin/objectSupport';
import toObject from 'dayjs/plugin/toObject';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(utc);
dayjs.extend(objectSupport);
dayjs.extend(toObject);
dayjs.extend(duration);
dayjs.extend(isBetween);

dayjs.initialize = (obj) => {
  const instance = dayjs.isDayjs(obj) ? obj : dayjs(obj);
  if (!instance.isValid()) {
    throw new Error('invalid Dayjs');
  }
  return instance;
};

export default dayjs;