import Timetable from '~/models/Timetable';
import { TimetableRepositoryInterface } from '~/interfaces/repositories/TimetableRepositoryInterface';
import TimetableUseCase from '~/usecases/TimetableUseCase';
import dayjs from '~/libs/dayjs';

const timetableRepository: TimetableRepositoryInterface = {
  async fetchAll(): Promise<Timetable[]> {
    throw new Error('Not implemented');
  },
};

describe('TimetableUseCase', () => {
  let timetables: Timetable[];

  let fetchAllSpy: jest.SpyInstance<Promise<Timetable[]>, []>;
  beforeEach(() => {
    timetables = [
      createTimetableFixture('stationA', 'weekday'),
      createTimetableFixture('stationA', 'holiday'),
      createTimetableFixture('stationB', 'weekday'),
      createTimetableFixture('stationB', 'holiday'),
    ];

    fetchAllSpy = jest
      .spyOn(timetableRepository, 'fetchAll')
      .mockResolvedValue(timetables);
  });

  afterEach(() => {
    fetchAllSpy.mockClear();
    fetchAllSpy.mockReset();
  });

  describe('#fetchAllInOperational(currentTime: number)', () => {
    it('case passing weekday time, should returning', async () => {
      const timetableUseCase = new TimetableUseCase(timetableRepository);
      const subject = new Date('2021-03-08T10:00:00+09:00').getTime();
      expect(await timetableUseCase.fetchAllInOperational(subject)).toEqual([
        timetables[0],
        timetables[2],
      ]);
    });

    it('case passing holiday time, should returning Timetables in the holiday', async () => {
      const timetableUseCase = new TimetableUseCase(timetableRepository);
      const subject = new Date('2021-03-07T10:00:00+09:00').getTime();
      expect(await timetableUseCase.fetchAllInOperational(subject)).toEqual([
        timetables[1],
        timetables[3],
      ]);
    });
  });

  describe('#fetchAll()', () => {
    it('should returning all Timetables', async () => {
      const timetableUseCase = new TimetableUseCase(timetableRepository);
      expect(await timetableUseCase.fetchAll()).toEqual(timetables);
    });
  });
});

const createTimetableFixture = (
  stationId: string,
  operationalDayId: string
): Timetable =>
  new Timetable(
    `test-${stationId}-${operationalDayId}`,
    new Date('2020-03-01T00:00:00+09:00'),
    stationId,
    'label',
    operationalDayId !== 'holiday' ? [1, 2, 3, 4, 5] : [0, 6],
    operationalDayId === 'holiday',
    [dayjs.duration(2, 'hours'), dayjs.duration(3, 'hours')]
  );
