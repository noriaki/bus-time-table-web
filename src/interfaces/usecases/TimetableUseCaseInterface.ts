import Timetable from '~/models/Timetable';

export interface TimetableUseCaseInterface {
  fetchAllInOperational(currentTime: number): Promise<Timetable[]>;
  fetchAll(): Promise<Timetable[]>;
}
