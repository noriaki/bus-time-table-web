export type StationId = 'home' | 'shimbashi' | 'higashiginza';
export type OperationalDay = 'weekday' | 'holiday';

export interface TimetableDriverInterface {
  find(
    stationId: StationId,
    oprationalDay: OperationalDay
  ): Promise<TimetableJson>;
}

export type TimetableJson = {
  version: number;
  published: string;
  id: string;
  station: string;
  label: string;
  activeDaysOfWeek: boolean;
  isActiveOnHoliday: boolean;
  timetable: HourData[];
};

export type HourData = {
  hour: number;
  minutes: number[];
  estimated: boolean;
};
