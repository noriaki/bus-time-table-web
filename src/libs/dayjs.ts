import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import objectSupport from 'dayjs/plugin/objectSupport';
import toObject from 'dayjs/plugin/toObject';
import duration, { Duration } from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(objectSupport);
dayjs.extend(toObject);
dayjs.extend(duration);
dayjs.extend(isBetween);

// config
dayjs.tz.setDefault('Asia/Tokyo');

// constants
dayjs.SUN = 0;
dayjs.MON = 1;
dayjs.TUE = 2;
dayjs.WED = 3;
dayjs.THU = 4;
dayjs.FRI = 5;
dayjs.SAT = 6;

// methods
dayjs.create = (obj: unknown): Dayjs => {
  const instance = dayjs.isDayjs(obj) ? obj : dayjs.tz(obj);
  if (!instance.isValid()) {
    throw new Error('invalid Dayjs');
  }
  return instance;
};

export { Dayjs, Duration };
export default dayjs;
