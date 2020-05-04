import moment from 'moment';
import {
  momentFromVersion,
  flattenTimeTable,
  findNextTime,
  sliceNextTimeList,
  isInactiveDays,
  isSuspended,
} from '~/libs/timeTableDataHandler';

import timeTableHome from '~/data/home-timetable.json';
import timeTableHigashiGinza from '~/data/st-higashiginza-timetable.json';
import timeTableShimbashi from '~/data/st-shimbashi-timetable.json';

describe('timeTableDataHandler', () => {
  describe('.momentFromVersion', () => {
    it('split `YYYYMMDD`', () => {
      const subject = momentFromVersion(20170101);
      const expected = moment('2017-01-01');
      expect(subject.isSame(expected)).toBe(true);
    });
  });

  describe('.flattenTimeTable', () => {
    [
      timeTableHome,
      timeTableHigashiGinza,
      timeTableShimbashi,
    ].forEach(({ name, timetable }) => {
      describe(`time-table of the '${name}' bus-stop`, () => {
        let subject;
        beforeEach(() => {
          subject = flattenTimeTable(timetable);
        });

        it('should sorted by moment asc', () => {
          expect(
            [...subject]
              .sort((a, b) => a.diff(b))
              .every((m, i) => m.isSame(subject[i]))
          ).toBe(true);
        });

        it('should every return items are moment object', () => {
          expect(subject.every(m => moment.isMoment(m))).toBe(true);
        });
      });
    });
  });

  describe('.findNextTime', () => {
    const raw = [
      { hour: 6, minutes: [0, 30, 50] },
      { hour: 7, minutes: [0, 10, 20, 40, 50] },
      { hour: 8, minutes: [0, 10, 30, 45, 55] },
      { hour: 9, minutes: [5, 40] },
      { hour: 23, minutes: [10, 20, 50] },
      { hour: 24, minutes: [20, 40] },
      { hour: 25, minutes: [0] },
    ];
    const durationLimit = moment.duration(10, 'hours').asMilliseconds();

    it('wait beginning bus (5:50)', () => {
      const currentTime = moment({ hour: 5, minute: 50 });
      const list = flattenTimeTable(raw, currentTime);
      const expected = list[0];
      const subject = findNextTime(list, currentTime);
      expect(subject.isSame(expected)).toBe(true);
      expect(subject.diff(currentTime)).toBeLessThanOrEqual(durationLimit);
    });

    it('just wait-time is 0 (6:30)', () => {
      const currentTime = moment({ hour: 6, minute: 30 });
      const list = flattenTimeTable(raw, currentTime);
      const expected = list[1];
      const subject = findNextTime(list, currentTime);
      expect(subject.isSame(expected)).toBe(true);
      expect(subject.diff(currentTime)).toBeLessThanOrEqual(durationLimit);
    });

    it('between the buses (8:51)', () => {
      const currentTime = moment({ hour: 8, minute: 51 });
      const list = flattenTimeTable(raw, currentTime);
      const expected = list[12];
      const subject = findNextTime(list, currentTime);
      expect(subject.isSame(expected)).toBe(true);
      expect(subject.diff(currentTime)).toBeLessThanOrEqual(durationLimit);
    });

    it('between dates (midnight passes; 23:58)', () => {
      const currentTime = moment({ hour: 23, minute: 58 });
      const list = flattenTimeTable(raw, currentTime);
      const expected = list[18];
      const subject = findNextTime(list, currentTime);
      expect(subject.isSame(expected)).toBe(true);
      expect(subject.diff(currentTime)).toBeLessThanOrEqual(durationLimit);
    });

    it('just midnight (0:00)', () => {
      const currentTime = moment({ hour: 0, minute: 0 });
      const list = flattenTimeTable(raw, currentTime);
      const expected = list[18];
      const subject = findNextTime(list, currentTime);
      expect(subject.isSame(expected)).toBe(true);
      expect(subject.diff(currentTime)).toBeLessThanOrEqual(durationLimit);
    });

    it('past midnight (0:31)', () => {
      const currentTime = moment({ hour: 0, minute: 31 });
      const list = flattenTimeTable(raw, currentTime);
      const expected = list[19];
      const subject = findNextTime(list, currentTime);
      expect(subject.isSame(expected)).toBe(true);
      expect(subject.diff(currentTime)).toBeLessThanOrEqual(durationLimit);
    });

    it('wait last bus (0:43)', () => {
      const currentTime = moment({ hour: 0, minute: 43 });
      const list = flattenTimeTable(raw, currentTime);
      const expected = list[20];
      const subject = findNextTime(list, currentTime);
      expect(subject.isSame(expected)).toBe(true);
      expect(subject.diff(currentTime)).toBeLessThanOrEqual(durationLimit);
    });

    it('the last bus is over (1:35)', () => {
      const currentTime = moment({ hour: 1, minute: 35 });
      const list = flattenTimeTable(raw, currentTime);
      const subject = findNextTime(list, currentTime);
      expect(subject).toBeUndefined();
    });

    describe('Boundary value test', () => {
      it('timetable should switches at 4 am (3:59:59 - 4:00:00)', () => {
        const beforeTheBoundaryTime = moment({
          hour: 3, minute: 59, second: 59,
        });
        const listBeforeTheBoundaryTime =
                flattenTimeTable(raw, beforeTheBoundaryTime);
        const beforeTheBoundaryTimeSubject =
                findNextTime(listBeforeTheBoundaryTime, beforeTheBoundaryTime);
        expect(beforeTheBoundaryTimeSubject).toBeUndefined();

        const onTheBoundaryTime = moment({ hour: 4 });
        const listOnTheBoundary = flattenTimeTable(raw, onTheBoundaryTime);
        const onTheBoundaryTimeExpected = listOnTheBoundary[0];
        const onTheBoundaryTimeSubject =
                findNextTime(listOnTheBoundary, onTheBoundaryTime);
        expect(
          onTheBoundaryTimeSubject.isSame(onTheBoundaryTimeExpected)
        ).toBe(true);
      });
    });
  });

  describe('.sliceNextTimeList', () => {
    const raw = [
      { hour: 6, minutes: [0, 30, 50] },
      { hour: 23, minutes: [10, 20, 50] },
      { hour: 24, minutes: [20, 40] },
      { hour: 25, minutes: [0] },
    ];

    it('wait beginning bus (5:50)', () => {
      const currentTime = moment({ hour: 5, minute: 50 });
      const list = flattenTimeTable(raw, currentTime);
      const expected = list.slice(0);
      const subject = sliceNextTimeList(list, currentTime);
      expect(subject).toEqual(expected);
    });

    it('just wait-time is 0 (6:30)', () => {
      const currentTime = moment({ hour: 6, minute: 30 });
      const list = flattenTimeTable(raw, currentTime);
      const expected = list.slice(1);
      const subject = sliceNextTimeList(list, currentTime);
      expect(subject).toEqual(expected);
    });

    it('between dates (midnight passes; 23:58)', () => {
      const currentTime = moment({ hour: 23, minute: 58 });
      const list = flattenTimeTable(raw, currentTime);
      const expected = list.slice(6);
      const subject = sliceNextTimeList(list, currentTime);
      expect(subject).toEqual(expected);
    });

    it('just midnight (0:00)', () => {
      const currentTime = moment({ hour: 0, minute: 0 });
      const list = flattenTimeTable(raw, currentTime);
      const expected = list.slice(6);
      const subject = sliceNextTimeList(list, currentTime);
      expect(subject).toEqual(expected);
    });

    it('past midnight (0:31)', () => {
      const currentTime = moment({ hour: 0, minute: 31 });
      const list = flattenTimeTable(raw, currentTime);
      const expected = list.slice(7);
      const subject = sliceNextTimeList(list, currentTime);
      expect(subject).toEqual(expected);
    });

    it('wait last bus (0:43)', () => {
      const currentTime = moment({ hour: 0, minute: 43 });
      const list = flattenTimeTable(raw, currentTime);
      const expected = list.slice(8);
      const subject = sliceNextTimeList(list, currentTime);
      expect(subject).toEqual(expected);
    });

    it('the last bus is over (1:35)', () => {
      const currentTime = moment({ hour: 1, minute: 35 });
      const list = flattenTimeTable(raw, currentTime);
      const expected = [];
      const subject = sliceNextTimeList(list, currentTime);
      expect(subject).toEqual(expected);
    });
  });

  describe('.isInactiveDays', () => {
    const activeDays = [1, 2, 3, 4, 5];
    let subjectTime;
    beforeEach(() => { subjectTime = moment('2017-06-15'); });

    describe('Weekend', () => {
      it('should be true in sunday 13:00', () => {
        subjectTime.day('sunday').hour(13);
        expect(isInactiveDays(activeDays, subjectTime)).toBe(true);
      });

      it('should be true in monday 1:30 (sunday 25:30)', () => {
        subjectTime.day('monday').hour(1).minute(30);
        expect(isInactiveDays(activeDays, subjectTime)).toBe(true);
      });

      it('should be false in monday 6:00', () => {
        subjectTime.day('monday').hour(6);
        expect(isInactiveDays(activeDays, subjectTime)).toBe(false);
      });

      it('should be false in friday 22:00', () => {
        subjectTime.day('friday').hour(22);
        expect(isInactiveDays(activeDays, subjectTime)).toBe(false);
      });

      it('should be false in saturday 0:50 (friday 24:50)', () => {
        subjectTime.day('saturday').minute(50);
        expect(isInactiveDays(activeDays, subjectTime)).toBe(false);
      });

      it('should be true in saturday 11:00', () => {
        subjectTime.day('saturday').hour(11);
        expect(isInactiveDays(activeDays, subjectTime)).toBe(true);
      });
    });

    describe('Public holiday', () => {
      it('should be true in `元日` 1/1 8:00', () => {
        subjectTime.set({ month: 0, date: 1, hour: 8 });
        expect(isInactiveDays(activeDays, subjectTime)).toBe(true);
      });

      it('should be true in `元日 振替休日` 1/2 8:00', () => {
        subjectTime.set({ month: 0, date: 2, hour: 8 });
        expect(isInactiveDays(activeDays, subjectTime)).toBe(true);
      });

      it('should be true in `春分の日` 3/21 1:00 (3/20 25:00)', () => {
        subjectTime.set({ month: 2, date: 21, hour: 1 });
        expect(isInactiveDays(activeDays, subjectTime)).toBe(true);
      });

      it('should be false in next day of `春分の日` 3/21 8:00', () => {
        subjectTime.set({ month: 2, date: 21, hour: 8 });
        expect(isInactiveDays(activeDays, subjectTime)).toBe(false);
      });
    });
  });

  describe('.isSuspended', () => {
    it('should be true in suspension days (2020/04/08-)', () => {
      const subjectTime = moment('2020-04-08T04:00:00');
      const { result: subject } = isSuspended(subjectTime);
      expect(subject).toBe(true);
    });

    it('should be false when out of suspension days', () => {
      const subjectTime = moment('2020-04-07T23:59:59');
      const { result: subject } = isSuspended(subjectTime);
      expect(subject).toBe(false);
    });

    it('should be false when out of suspension days over midnight', () => {
      const subjectTime = moment('2020-04-08T03:59:59');
      const { result: subject } = isSuspended(subjectTime);
      expect(subject).toBe(false);
    });
  });
});
