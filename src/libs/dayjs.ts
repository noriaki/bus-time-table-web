import dayjs, { Dayjs, ConfigType } from 'dayjs';
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
export const SUN = 0 as const;
export const MON = 1 as const;
export const TUE = 2 as const;
export const WED = 3 as const;
export const THU = 4 as const;
export const FRI = 5 as const;
export const SAT = 6 as const;

// methods
export const createDayjs = (
  obj?: ConfigType | Record<string, unknown>
): Dayjs => {
  const instance = dayjs.isDayjs(obj) ? obj : dayjs.tz(obj);
  if (!instance.isValid()) {
    throw new Error('invalid Dayjs');
  }
  return instance;
};

export { Dayjs, Duration };
export default dayjs;
