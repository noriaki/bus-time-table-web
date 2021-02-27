import dayjs from '~/libs/dayjs';
import Timetable from '~/models/Timetable';

describe('Domain models / Timetable', () => {
  describe('static .convertTime', () => {
    it('should returning elapsed time(msec) since 4am', () => {
      const subjectTime = { hour: 8, minute: 10 } as const; // 8:10
      const expectedTime = (4 * 60 * 60 + 10 * 60) * 1000; // msec since 4am (-4 hours)
      expect(Timetable.convertTime(subjectTime)).toBe(expectedTime);
    });
  });
});
