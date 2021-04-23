import Timetable, { StationId, OperationalDayId } from '~/models/Timetable';

export type GroupedTimetables = {
  [station in string]?: Timetable[];
};

export const groupByStation = (timetables: Timetable[]): GroupedTimetables =>
  timetables.reduce<GroupedTimetables>((ret, timetable) => {
    const station = timetable.station;
    (ret[station] || (ret[station] = [])).push(timetable);
    return ret;
  }, {});

interface WeekdayTimetable extends Timetable {
  isActiveOnHoliday: false;
}
interface HolidayTimetable extends Timetable {
  isActiveOnHoliday: true;
}

export const pickByOperationalDay = (
  timetables: Timetable[]
): [WeekdayTimetable, HolidayTimetable] => {
  const weekdayTimetable = timetables.find(
    (t) => t.isActiveOnHoliday === false
  );
  const holidayTimetable = timetables.find((t) => t.isActiveOnHoliday === true);
  return [weekdayTimetable, holidayTimetable];
};

export const leftFillZero = (num: number): string =>
  num.toString().padStart(2, '0');
