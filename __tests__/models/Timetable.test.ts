import Timetable from '~/models/Timetable';

describe('Domain models / Timetable', () => {
  describe('static .convertTime', () => {
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
});
