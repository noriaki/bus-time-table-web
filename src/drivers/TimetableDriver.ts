import {
  TimetableDriverInterface,
  TimetableJson,
  StationId,
  OperationalDayId,
} from '~/interfaces/drivers/TimetableDriverInterface';

import timetableDataHomeWeekday from '~/data/timetable/home-weekday.json';
import timetableDataHomeHoliday from '~/data/timetable/home-holiday.json';

const timetables = [timetableDataHomeWeekday, timetableDataHomeHoliday];

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
