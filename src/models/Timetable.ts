import dayjs from '~/libs/dayjs';

export const daysOfWeek = [0, 1, 2, 3, 4, 5, 6] as const; // Sunday(0) - Saturday(6)
export type DaysOfWeek = typeof daysOfWeek[number];

const TIME_SHIFT = 4;
export type ElapsedMsecSince4am = number;

export default class Timetable {
  readonly id: string;
  readonly published: Date;
  readonly station: string;
  readonly label: string;
  readonly activeDaysOfWeek: DaysOfWeek[];
  readonly isActiveOnHoliday: boolean;
  readonly data: ElapsedMsecSince4am[];

  static convertTime({
    hour,
    minute,
  }: {
    hour: number;
    minute: number;
  }): ElapsedMsecSince4am {
    const source = dayjs.create({ hour, minute }).subtract(4, 'hours');
    const start = source.startOf('day');
    return source.diff(start);
  }
}
