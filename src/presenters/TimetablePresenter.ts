import Timetable, { StationId, OperationalDayId } from '~/models/Timetable';

export type GroupedTimetables = {
  [station in StationId]?: Timetable[];
};

export const groupByStation = (timetables: Timetable[]): GroupedTimetables =>
  timetables.reduce<GroupedTimetables>((ret, timetable) => {
    const station = timetable.station;
    if (isStationId(station)) {
      if (ret[station] === undefined) {
        ret[station] = [];
      }
      ret[station]?.push(timetable);
    }
    return ret;
  }, {});

const isStationId = (station: unknown): station is StationId =>
  Timetable.allStationIds().includes(station as StationId);

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
