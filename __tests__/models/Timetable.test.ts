import Timetable from '~/models/Timetable';

describe('Domain models / Timetable', () => {
  describe('.convertTime: convert to value for using inside', () => {
    it('should returning elapsed time(duration) since 4am', () => {
      const expectedTime = (4 * 60 * 60 + 10 * 60) * 1000; // msec since 4am (-4 hours)
      const subjectTime = { hour: 8, minute: 10 } as const; // 8:10
      const subject = Timetable.convertTime(subjectTime);
      expect(subject.asMilliseconds()).toBe(expectedTime);
    });

    it('case over-midnight, should returning elapsed time(msec) since 4am of previous day', () => {
      const expectedTime = (20 * 60 * 60 + 40 * 60) * 1000; // msec
      const subjectTime = { hour: 24, minute: 40 } as const; // 24:40 = 0:40
      const subject = Timetable.convertTime(subjectTime);
      expect(subject.asMilliseconds()).toBe(expectedTime);
    });
  });

  describe('.revertTime: revert from value for using inside', () => {
    it('should returning timestamp based on 2nd arg', () => {
      const subjectTime = Timetable.convertTime({ hour: 8, minute: 10 });
      const baseTime = new Date('2021-03-03T07:00:00+09:00').getTime();
      const subject = Timetable.revertTime(subjectTime, baseTime).valueOf();
      const expected = new Date('2021-03-03T08:10:00+09:00').getTime();
      expect(subject).toBe(expected);
    });
  });

  describe('#isInServiceDay: is available taking the bus', () => {
    describe('Timetable for weekday', () => {
      let timetable: Timetable;
      beforeEach(() => {
        timetable = new Timetable(
          'test',
          new Date('2020-11-01T00:00:00+09:00'),
          'station',
          'label',
          [1, 2, 3, 4, 5], // MON, TUE, WED, THU, FRI
          false, // is active on holiday
          []
        );
      });

      it('should returning `false` in Sunday 13:00', () => {
        const subject = new Date('2021-03-07T13:00:00+09:00').getTime();
        const expected = false;
        expect(timetable.isInServiceDay(subject)).toBe(expected);
      });

      it('should returning `false` in Monday 1:30 (Sunday 25:30)', () => {
        const subject = new Date('2021-03-08T01:30:00+09:00').getTime();
        const expected = false;
        expect(timetable.isInServiceDay(subject)).toBe(expected);
      });

      it('should returning `true` in Monday 6:00', () => {
        const subject = new Date('2021-03-08T06:00:00+09:00').getTime();
        const expected = true;
        expect(timetable.isInServiceDay(subject)).toBe(expected);
      });

      it('should returning `true` in Friday 22:00', () => {
        const subject = new Date('2021-03-12T22:00:00+09:00').getTime();
        const expected = true;
        expect(timetable.isInServiceDay(subject)).toBe(expected);
      });

      it('should returning `true` in Saturday 0:50 (Friday 24:50)', () => {
        const subject = new Date('2021-03-13T00:50:00+09:00').getTime();
        const expected = true;
        expect(timetable.isInServiceDay(subject)).toBe(expected);
      });

      it('should returning `false` in Saturday 11:00', () => {
        const subject = new Date('2021-03-13T11:00:00+09:00').getTime();
        const expected = false;
        expect(timetable.isInServiceDay(subject)).toBe(expected);
      });

      it('should returning `false` in 2021/01/01 8:00 Fri (元旦)', () => {
        const subject = new Date('2021-01-01T08:00:00+09:00').getTime();
        const expected = false;
        expect(timetable.isInServiceDay(subject)).toBe(expected);
      });

      it('should returning `false` in 2021/02/11 8:00 Thu (建国記念日)', () => {
        const subject = new Date('2021-02-11T08:00:00+09:00').getTime();
        const expected = false;
        expect(timetable.isInServiceDay(subject)).toBe(expected);
      });

      it('should returning `true` in 2021/02/11 1:00 Thu (before 4am 建国記念日)', () => {
        const subject = new Date('2021-02-11T01:00:00+09:00').getTime();
        const expected = true;
        expect(timetable.isInServiceDay(subject)).toBe(expected);
      });
    });

    describe('Timetable for holiday', () => {
      let timetable: Timetable;
      beforeEach(() => {
        timetable = new Timetable(
          'test',
          new Date('2020-11-01T00:00:00+09:00'),
          'station',
          'label',
          [0, 6], // SUN, SAT
          true, // is active on holiday
          []
        );
      });

      it('should returning `true` in Sunday 13:00', () => {
        const subject = new Date('2021-03-07T13:00:00+09:00').getTime();
        const expected = true;
        expect(timetable.isInServiceDay(subject)).toBe(expected);
      });

      it('should returning `true` in Monday 1:30 (Sunday 25:30)', () => {
        const subject = new Date('2021-03-08T01:30:00+09:00').getTime();
        const expected = true;
        expect(timetable.isInServiceDay(subject)).toBe(expected);
      });

      it('should returning `false` in Monday 6:00', () => {
        const subject = new Date('2021-03-08T06:00:00+09:00').getTime();
        const expected = false;
        expect(timetable.isInServiceDay(subject)).toBe(expected);
      });

      it('should returning `false` in Friday 22:00', () => {
        const subject = new Date('2021-03-12T22:00:00+09:00').getTime();
        const expected = false;
        expect(timetable.isInServiceDay(subject)).toBe(expected);
      });

      it('should returning `false` in Saturday 0:50 (Friday 24:50)', () => {
        const subject = new Date('2021-03-13T00:50:00+09:00').getTime();
        const expected = false;
        expect(timetable.isInServiceDay(subject)).toBe(expected);
      });

      it('should returning `true` in Saturday 11:00', () => {
        const subject = new Date('2021-03-13T11:00:00+09:00').getTime();
        const expected = true;
        expect(timetable.isInServiceDay(subject)).toBe(expected);
      });

      it('should returning `true` in 2021/01/01 8:00 Fri (元旦)', () => {
        const subject = new Date('2021-01-01T08:00:00+09:00').getTime();
        const expected = true;
        expect(timetable.isInServiceDay(subject)).toBe(expected);
      });

      it('should returning `true` in 2021/02/11 8:00 Thu (建国記念日)', () => {
        const subject = new Date('2021-02-11T08:00:00+09:00').getTime();
        const expected = true;
        expect(timetable.isInServiceDay(subject)).toBe(expected);
      });

      it('should returning `false` in 2021/02/11 1:00 Thu (before 4am 建国記念日)', () => {
        const subject = new Date('2021-02-11T01:00:00+09:00').getTime();
        const expected = false;
        expect(timetable.isInServiceDay(subject)).toBe(expected);
      });
    });
  });

  describe('#findNextTime', () => {
    let timetable: Timetable;
    beforeEach(() => {
      timetable = new Timetable(
        'test',
        new Date('2021-03-01T00:00:00+09:00'),
        'station',
        'label',
        [1, 2, 3, 4, 5],
        false,
        createFixtureData()
      );
    });

    it('waiting for the first bus (5:50), returning 6:00', () => {
      const currentTime = new Date('2021-03-03T05:50:00+09:00').getTime();
      const expected = new Date('2021-03-03T06:00:00+09:00').getTime();
      const subject = timetable.findNextTime(currentTime)?.valueOf();
      expect(subject).toBe(expected);
    });

    it('same time as bus arrival (6:30), returning 6:30', () => {
      const currentTime = new Date('2021-03-03T06:30:00+09:00').getTime();
      const expected = new Date('2021-03-03T06:30:00+09:00').getTime();
      const subject = timetable.findNextTime(currentTime)?.valueOf();
      expect(subject).toBe(expected);
    });

    it('between the buses (8:51), returning 8:55', () => {
      const currentTime = new Date('2021-03-03T08:51:00+09:00').getTime();
      const expected = new Date('2021-03-03T08:55:00+09:00').getTime();
      const subject = timetable.findNextTime(currentTime)?.valueOf();
      expect(subject).toBe(expected);
    });

    it('between dates, midnight passes (23:58), returning 24:20', () => {
      const currentTime = new Date('2021-03-03T23:58:00+09:00').getTime();
      const expected = new Date('2021-03-04T00:20:00+09:00').getTime();
      const subject = timetable.findNextTime(currentTime)?.valueOf();
      expect(subject).toBe(expected);
    });

    it('just midnight (24:00), returning 24:20', () => {
      const currentTime = new Date('2021-03-04T00:00:00+09:00').getTime();
      const expected = new Date('2021-03-04T00:20:00+09:00').getTime();
      const subject = timetable.findNextTime(currentTime)?.valueOf();
      expect(subject).toBe(expected);
    });

    it('after midnight (24:31), returning 24:40', () => {
      const currentTime = new Date('2021-03-04T00:31:00+09:00').getTime();
      const expected = new Date('2021-03-04T00:40:00+09:00').getTime();
      const subject = timetable.findNextTime(currentTime)?.valueOf();
      expect(subject).toBe(expected);
    });

    it('waiting for the last bus (24:43), returning 25:00', () => {
      const currentTime = new Date('2021-03-04T00:43:00+09:00').getTime();
      const expected = new Date('2021-03-04T01:00:00+09:00').getTime();
      const subject = timetable.findNextTime(currentTime)?.valueOf();
      expect(subject).toBe(expected);
    });

    it('missing the last bus (25:35), returning `null`', () => {
      const currentTime = new Date('2021-03-04T01:35:00+09:00').getTime();
      const subject = timetable.findNextTime(currentTime);
      expect(subject).toBeNull();
    });
  });

  describe('#asData', () => {
    let timetable: Timetable;
    beforeEach(() => {
      timetable = new Timetable(
        'test',
        new Date('2021-03-01T00:00:00+09:00'),
        'station',
        'label',
        [1, 2, 3, 4, 5],
        false,
        createFixtureData()
      );
    });

    it('should transform to { hour: number, minutes: number[] } for Table view', () => {
      const expected = [
        { hour: 6, minutes: [0, 30, 50] },
        { hour: 7, minutes: [0, 10, 20, 30, 40, 50] },
        { hour: 8, minutes: [0, 10, 30, 45, 55] },
        { hour: 9, minutes: [5, 40] },
        { hour: 23, minutes: [10, 20, 50] },
        { hour: 24, minutes: [20, 40] },
        { hour: 25, minutes: [0] },
      ];
      const subject = timetable.asData();
      expect(subject).toEqual(expected);
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
