import Timetable from '~/models/Timetable';
import { TimetableRepositoryInterface } from '~/interfaces/repositories/TimetableRepositoryInterface';
import {
  TimetableDriverInterface,
  HourData,
} from '~/interfaces/drivers/TimetableDriverInterface';
import { Duration } from '~/libs/dayjs';

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
          t.timetable.flatMap(mapHourDataToDuration)
        )
    );
  }
}

const mapHourDataToDuration = (data: HourData): Duration[] => {
  const { hour, minutes } = data;
  return minutes.map((minute) => Timetable.convertTime({ hour, minute }));
};
