import {
  TimetableDriverInterface,
  TimetableJson,
  StationId,
  OperationalDay,
} from '~/interfaces/drivers/TimetableDriverInterface';

import timetableDataHomeWeekday from '~/data/timetable/home-weekday';
import timetableDataHomeHoliday from '~/data/timetable/home-holiday';

const timetables = {
  'home-weekday': timetableDataHomeWeekday as TimetableJson,
  'home-holiday': timetableDataHomeHoliday as TimetableJson,
} as const;

export default class TimetableDriver implements TimetableDriverInterface {
  async find(
    stationId: StationId,
    operationalDay: OperationalDay
  ): Promise<TimetableJson> {
    const ret = timetables[`${stationId}-${operationalDay}`];
    if (ret === undefined) {
      throw new Error('Timetable data is not found');
    }
    return ret;
  }
}
