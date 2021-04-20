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

export const leftFillZero = (num: number): string =>
  num.toString().padStart(2, '0');
