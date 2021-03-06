import type { StationId, OperationalDayId } from '~/models/Timetable';
export type { StationId, OperationalDayId };

export interface TimetableDriverInterface {
  fetch(
    stationId: StationId,
    oprationalDayId: OperationalDayId
  ): Promise<TimetableJson>;

  fetchAll(): Promise<TimetableJson[]>;
}

export type TimetableJson = {
  version: number;
  published: string;
  id: string;
  station: string;
  label: string;
  activeDaysOfWeek: number[];
  isActiveOnHoliday: boolean;
  timetable: HourData[];
};

export type HourData = {
  hour: number;
  minutes: number[];
  estimated: boolean;
};
