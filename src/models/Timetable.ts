import { isHoliday } from '@holiday-jp/holiday_jp';
import SuperJSON from 'superjson';

import dayjs, {
  createDayjs,
  Duration,
  SUN,
  MON,
  TUE,
  WED,
  THU,
  FRI,
  SAT,
} from '~/libs/dayjs';

const _BASE_DATE = { year: 2021, month: 3, day: 1 } as const; // for creating dayjs instance
const TIME_SHIFT = 4 as const;

const shiftTime = (currentTime: Parameters<typeof createDayjs>[0]) =>
  createDayjs(currentTime).subtract(TIME_SHIFT, 'hours');

export const daysOfWeek = [SUN, MON, TUE, WED, THU, FRI, SAT] as const;
export type DaysOfWeek = typeof daysOfWeek[number];

const stationIds = ['home', 'shimbashi', 'higashiginza'] as const;
const operationalDayIds = ['weekday', 'holiday'] as const;
export type StationId = typeof stationIds[number];
export type OperationalDayId = typeof operationalDayIds[number];

export type ConvertTimePropObject = {
  hour: number;
  minute: number;
};
export type ConvertTimeProps = ConvertTimePropObject | number;

type TimetableJSON = {
  id: string;
  published: string;
  station: string;
  label: string;
  activeDaysOfWeek: DaysOfWeek[];
  isActiveOnHoliday: boolean;
  data: string[];
};

export default class Timetable {
  readonly id: string;
  readonly published: Date;
  readonly station: string;
  readonly label: string;
  private readonly activeDaysOfWeek: DaysOfWeek[];
  private readonly isActiveOnHoliday: boolean;
  private readonly data: Duration[];

  constructor(
    id: string,
    published: Date,
    station: string,
    label: string,
    activeDaysOfWeek: DaysOfWeek[],
    isActiveOnHoliday: boolean,
    data: Duration[]
  ) {
    this.id = id;
    this.published = published;
    this.station = station;
    this.label = label;
    this.activeDaysOfWeek = activeDaysOfWeek;
    this.isActiveOnHoliday = isActiveOnHoliday;
    this.data = data;
  }

  static allStationIds() {
    return stationIds;
  }

  static allOperationalDayIds() {
    return operationalDayIds;
  }

  static convertTime(prop: ConvertTimeProps) {
    let time = prop;
    if (typeof prop !== 'number') {
      time = { ..._BASE_DATE, hour: prop.hour, minute: prop.minute };
    }
    const source = shiftTime(time);
    const start = source.startOf('day');
    return dayjs.duration(source.diff(start));
  }

  static revertTime(time: Duration, base: number = createDayjs().valueOf()) {
    return shiftTime(base).startOf('day').add(TIME_SHIFT, 'hours').add(time);
  }

  findNextTime(currentTime: number, offsetIndex: number = 0) {
    const convertedCurrentTime = Timetable.convertTime(currentTime);
    const resultIndex = this.data.findIndex(
      (time) => convertedCurrentTime.asMilliseconds() <= time.asMilliseconds()
    );
    if (resultIndex === -1) {
      return null;
    }
    const resultData = this.data[resultIndex + offsetIndex];
    if (resultData === undefined) {
      return null;
    }
    return Timetable.revertTime(resultData, currentTime);
  }

  isInServiceDay(currentTime: number): boolean {
    const date = shiftTime(currentTime);
    if (isHoliday(date.toDate())) {
      return this.isActiveOnHoliday;
    }
    if (this.activeDaysOfWeek.includes(date.day() as DaysOfWeek)) {
      return true;
    }
    return false;
  }

  // isInOperationalTime(currentTime: number): boolean {
  // }

  /* Passing values between server and client side (with SuperJSON) */
  /* #asJSON, .fromJSON, .isTimetable, .registerPersistentProps */
  asJSON(): TimetableJSON {
    return JSON.parse(JSON.stringify(this));
  }

  static fromJSON(props: TimetableJSON): Timetable {
    return new Timetable(
      props.id,
      new Date(props.published),
      props.station,
      props.label,
      props.activeDaysOfWeek,
      props.isActiveOnHoliday,
      props.data.map((d) => dayjs.duration(d))
    );
  }

  static isTimetable(t: unknown): t is Timetable {
    return t instanceof Timetable;
  }

  static registerPersistentProps(): void {
    SuperJSON.registerCustom<Timetable, TimetableJSON>(
      {
        isApplicable: Timetable.isTimetable,
        serialize: (v) => v.asJSON(),
        deserialize: Timetable.fromJSON,
      },
      'Timetable'
    );
  }
}
