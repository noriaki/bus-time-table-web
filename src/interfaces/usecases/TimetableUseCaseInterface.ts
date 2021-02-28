import Timetable from '~/models/Timetable';

export interface TimetableUseCaseInterface {
  isInOperational(currentTime: number): boolean;
  fetchInOperational(currentTime: number): Promise<Timetable>;
}
