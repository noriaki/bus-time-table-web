import Timetable from '~/models/Timetable';

describe('Domain models / Timetable', () => {
  describe('.convertTime: convert to value for using inside', () => {
    it('should returning elapsed time(msec) since 4am', () => {
      const subjectTime = { hour: 8, minute: 10 } as const; // 8:10
      const expectedTime = (4 * 60 * 60 + 10 * 60) * 1000; // msec since 4am (-4 hours)
      expect(Timetable.convertTime(subjectTime)).toBe(expectedTime);
    });

    it('case over-midnight, should returning elapsed time(msec) since 4am of previous day', () => {
      const subjectTime = { hour: 24, minute: 40 } as const; // 24:40 = 0:40
      const expectedTime = (20 * 60 * 60 + 40 * 60) * 1000; // msec
      expect(Timetable.convertTime(subjectTime)).toBe(expectedTime);
    });
  });

  describe('.revertTime: revert from value for using inside', () => {
    it('should returning timestamp based on 2nd arg', () => {
      const subjectTime = (4 * 60 * 60 + 10 * 60) * 1000; // 8:10
      const baseTime = new Date('2021-03-03T07:00:00+09:00').getTime();
      const subject = Timetable.revertTime(subjectTime, baseTime).valueOf();
      const expected = new Date('2021-03-03T08:10:00+09:00').getTime();
      expect(subject).toBe(expected);
    });
  });

  describe('#findNextTime', () => {
    let fixtureData: number[];
    let timetable: Timetable;
    beforeEach(() => {
      fixtureData = createFixtureData();
      timetable = new Timetable(
        'test',
        new Date('2021-03-01T00:00:00+09:00'),
        'station',
        'label',
        [1, 2, 3, 4, 5],
        false,
        fixtureData
      );
    });

    it('waiting for the first bus (5:50), returning 6:00', () => {
      const currentTime = new Date('2021-03-03T05:50:00+09:00').getTime();
      const expected = fixtureData[0];
      const subject = timetable.findNextTime(currentTime);
      expect(subject).toBe(expected);
    });

    it('same time as bus arrival (6:30), returning 6:30', () => {
      const currentTime = new Date('2021-03-03T06:30:00+09:00').getTime();
      const expected = fixtureData[1];
      const subject = timetable.findNextTime(currentTime);
      expect(subject).toBe(expected);
    });

    it('between the buses (8:51), returning 8:55', () => {
      const currentTime = new Date('2021-03-03T08:51:00+09:00').getTime();
      const expected = fixtureData[13];
      const subject = timetable.findNextTime(currentTime);
      expect(subject).toBe(expected);
    });

    it('between dates, midnight passes (23:58), returning 24:20', () => {
      const currentTime = new Date('2021-03-03T23:58:00+09:00').getTime();
      const expected = fixtureData[19];
      const subject = timetable.findNextTime(currentTime);
      expect(subject).toBe(expected);
    });

    it('just midnight (24:00), returning 24:20', () => {
      const currentTime = new Date('2021-03-04T00:00:00+09:00').getTime();
      const expected = fixtureData[19];
      const subject = timetable.findNextTime(currentTime);
      expect(subject).toBe(expected);
    });

    it('after midnight (24:31), returning 24:40', () => {
      const currentTime = new Date('2021-03-04T00:31:00+09:00').getTime();
      const expected = fixtureData[20];
      const subject = timetable.findNextTime(currentTime);
      expect(subject).toBe(expected);
    });

    it('waiting for the last bus (24:43), returning 25:00', () => {
      const currentTime = new Date('2021-03-04T00:43:00+09:00').getTime();
      const expected = fixtureData[21];
      const subject = timetable.findNextTime(currentTime);
      expect(subject).toBe(expected);
    });

    it('missing the last bus (25:35), returning `null`', () => {
      const currentTime = new Date('2021-03-04T01:35:00+09:00').getTime();
      const subject = timetable.findNextTime(currentTime);
      expect(subject).toBeNull();
    });
  });
});

const createFixtureData = () => [
  Timetable.convertTime({ hour: 6, minute: 0 }), // 0
  Timetable.convertTime({ hour: 6, minute: 30 }),
  Timetable.convertTime({ hour: 6, minute: 50 }),
  Timetable.convertTime({ hour: 7, minute: 0 }),
  Timetable.convertTime({ hour: 7, minute: 10 }),
  Timetable.convertTime({ hour: 7, minute: 20 }), // 5
  Timetable.convertTime({ hour: 7, minute: 30 }),
  Timetable.convertTime({ hour: 7, minute: 40 }),
  Timetable.convertTime({ hour: 7, minute: 50 }),
  Timetable.convertTime({ hour: 8, minute: 0 }),
  Timetable.convertTime({ hour: 8, minute: 10 }), // 10
  Timetable.convertTime({ hour: 8, minute: 30 }),
  Timetable.convertTime({ hour: 8, minute: 45 }),
  Timetable.convertTime({ hour: 8, minute: 55 }),
  Timetable.convertTime({ hour: 9, minute: 5 }),
  Timetable.convertTime({ hour: 9, minute: 40 }), // 15
  Timetable.convertTime({ hour: 23, minute: 10 }),
  Timetable.convertTime({ hour: 23, minute: 20 }),
  Timetable.convertTime({ hour: 23, minute: 50 }),
  Timetable.convertTime({ hour: 24, minute: 20 }),
  Timetable.convertTime({ hour: 24, minute: 40 }), // 20
  Timetable.convertTime({ hour: 25, minute: 0 }),
];
