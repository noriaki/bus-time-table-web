import Timetable from '~/models/Timetable';
import { TimetableRepositoryInterface } from '~/interfaces/repositories/TimetableRepositoryInterface';
import { TimetableDriverInterface } from '~/interfaces/drivers/TimetableDriverInterface';

export default class TimetableRepository
  implements TimetableRepositoryInterface {
  private readonly timetableDriver: TimetableDriverInterface;

  constructor(timetableDriver: TimetableDriverInterface) {
    this.timetableDriver = timetableDriver;
  }

  async fetchAll(): Promise<Timetable[]> {
    const timetables = await this.timetableDriver.fetchAll();
    return timetables.map(
      (t) =>
        new Timetable(
          t.id,
          new Date(t.published),
          t.station,
          t.label,
          t.activeDaysOfWeek,
          t.isActiveOnHoliday,
          t.timetable
        )
    );
  }
}
