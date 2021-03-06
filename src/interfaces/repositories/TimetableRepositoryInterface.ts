import Timetable from '~/models/Timetable';

export interface TimetableRepositoryInterface {
  fetchAll(): Promise<Timetable[]>;
}
