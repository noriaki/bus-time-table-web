import {
  TimetableDriverInterface,
  TimetableJson,
  StationId,
  OperationalDayId,
} from '~/interfaces/drivers/TimetableDriverInterface';

import timetableDataHomeWeekday from '~/data/timetable/home-weekday.json';
import timetableDataHomeHoliday from '~/data/timetable/home-holiday.json';
import timetableDataHigashiginzaWeekday from '~/data/timetable/higashiginza-weekday.json';
import timetableDataHigashiginzaHoliday from '~/data/timetable/higashiginza-holiday.json';
import timetableDataShimbashiWeekday from '~/data/timetable/shimbashi-weekday.json';
import timetableDataShimbashiHoliday from '~/data/timetable/shimbashi-holiday.json';

const timetables = [
  timetableDataHomeWeekday,
  timetableDataHomeHoliday,
  timetableDataHigashiginzaWeekday,
  timetableDataHigashiginzaHoliday,
  timetableDataShimbashiWeekday,
  timetableDataShimbashiHoliday,
] as TimetableJson[];

export default class TimetableDriver implements TimetableDriverInterface {
  async fetch(
    stationId: StationId,
    operationalDayId: OperationalDayId
  ): Promise<TimetableJson> {
    const id = stationId + '-' + operationalDayId;
    const ret = timetables.find((timetable) => timetable.id === id);
    if (ret === undefined) {
      throw new Error('Timetable data is not found');
    }
    return ret;
  }

  async fetchAll(): Promise<TimetableJson[]> {
    return timetables;
  }
}
