import TimetableRepository from '~/repositories/TimetableRepository';
import Timetable from '~/models/Timetable';
import {
  TimetableDriverInterface,
  TimetableJson,
} from '~/interfaces/drivers/TimetableDriverInterface';

const timetableDriver: TimetableDriverInterface = {
  async fetchAll(): Promise<TimetableJson[]> {
    throw new Error('Not implemented');
  },
  async fetch(s, o): Promise<TimetableJson> {
    throw new Error('Not implemented');
  },
};

describe('TimetableRepository', () => {
  it('#fetchAll should returning Timetable model instances', async () => {
    const timetables: TimetableJson[] = [
      {
        version: 20200101,
        published: '2020-03-01T15:00:00+09:00',
        id: 'test',
        station: 'station',
        label: 'label',
        activeDaysOfWeek: [1, 2, 3, 4, 5],
        isActiveOnHoliday: false,
        timetable: [],
      },
    ];
    const fetchAllSpy = jest
      .spyOn(timetableDriver, 'fetchAll')
      .mockReturnValue(new Promise((resolve) => resolve(timetables)));

    const timetableRpository = new TimetableRepository(timetableDriver);
    expect(await timetableRpository.fetchAll()).toEqual([
      new Timetable(
        'test',
        new Date('2020-03-01T15:00:00+09:00'),
        'station',
        'label',
        [1, 2, 3, 4, 5],
        false,
        []
      ),
    ]);
    expect(fetchAllSpy).toHaveBeenCalledTimes(1);
    fetchAllSpy.mockClear();
    fetchAllSpy.mockReset();
  });
});
