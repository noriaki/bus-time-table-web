import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import objectSupport from 'dayjs/plugin/objectSupport';
import duration from 'dayjs/plugin/duration';

dayjs.extend(utc);
dayjs.extend(objectSupport);
dayjs.extend(duration);

export default dayjs;
