import dayjs, { createDayjs, Duration } from '~/libs/dayjs';

const _BASE_DATE = { year: 2021, month: 3, day: 1 } as const; // for creating dayjs instance
const TIME_SHIFT = 4 as const;

export const daysOfWeek = [0, 1, 2, 3, 4, 5, 6] as const; // Sunday(0) - Saturday(6)
export type DaysOfWeek = typeof daysOfWeek[number];

export type ConvertTimePropObject = {
  hour: number;
  minute: number;
};
export type ConvertTimeProps = ConvertTimePropObject | number;

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

  static convertTime(prop: ConvertTimeProps) {
    let time = prop;
    if (typeof prop !== 'number') {
      time = { ..._BASE_DATE, hour: prop.hour, minute: prop.minute };
    }
    const source = createDayjs(time).subtract(TIME_SHIFT, 'hours');
    const start = source.startOf('day');
    return dayjs.duration(source.diff(start));
  }

  static revertTime(time: Duration, base: number = createDayjs().valueOf()) {
    return createDayjs(base)
      .subtract(TIME_SHIFT, 'hours')
      .startOf('day')
      .add(TIME_SHIFT, 'hours')
      .add(time);
  }

  findNextTime(currentTime: number) {
    const convertedCurrentTime = Timetable.convertTime(currentTime);
    const result = this.data.find(
      (time) => convertedCurrentTime.asMilliseconds() <= time.asMilliseconds()
    );
    if (result === undefined) {
      return null;
    }
    return Timetable.revertTime(result, currentTime);
  }
}
