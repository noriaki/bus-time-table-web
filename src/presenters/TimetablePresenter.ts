import Timetable, {
  StationId,
  OperationalDayId,
  WeekdayTimetable,
  HolidayTimetable,
  DataJSON,
} from '~/models/Timetable';

export type GroupedTimetables = {
  [station in string]: Timetable[];
};

export const groupByStation = (timetables: Timetable[]): GroupedTimetables =>
  timetables.reduce<GroupedTimetables>((ret, timetable) => {
    const station = timetable.station;
    (ret[station] || (ret[station] = [])).push(timetable);
    return ret;
  }, {});

export const pickByOperationalDay = (
  timetables: Timetable[]
): [WeekdayTimetable, HolidayTimetable] => {
  const weekdayTimetable = timetables.find(
    (t): t is WeekdayTimetable => t.isActiveOnHoliday === false
  );
  const holidayTimetable = timetables.find(
    (t): t is HolidayTimetable => t.isActiveOnHoliday === true
  );
  if (weekdayTimetable == null || holidayTimetable == null) {
    throw new Error('WeekdayTimetable | HolidayTimetable not found');
  }
  return [weekdayTimetable, holidayTimetable];
};

export const timetableHours = [
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
] as const;
export const timetableMinutes = [
  0,
  5,
  10,
  15,
  20,
  25,
  30,
  35,
  40,
  45,
  50,
  55,
] as const;

export const mapDataToHours = (data: DataJSON[]) =>
  timetableHours.map(
    (hour) => data.find((d) => d.hour === hour) || { hour, minutes: [] }
  );

export const leftFillZero = (num: number): string =>
  num.toString().padStart(2, '0');
