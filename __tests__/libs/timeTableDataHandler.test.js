import moment from 'moment';
import {
  momentFromVersion,
  flattenTimeTable,
  findNextTime,
} from '../../libs/timeTableDataHandler';
import timeTableData from '../../data/timetable.json';

describe('timeTableDataHandler', () => {
  describe('.momentFromVersion', () => {
    it('split `YYYYMMDD`', () => {
      const subject = momentFromVersion(20170101);
      const expected = moment('2017-01-01');
      expect(subject.isSame(expected)).toBe(true);
    });
  });

  describe('.flattenTimeTable', () => {
    let subject;
    beforeEach(() => {
      subject = flattenTimeTable(timeTableData.homeToStation);
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
    let list;
    beforeEach(() => {
      list = flattenTimeTable(raw);
    });

    it('wait beginning bus', () => {
      const currentTime = moment({ hour: 5, minute: 50 });
      const expected = list[0];
      const subject = findNextTime(list, currentTime);
      expect(subject.isSame(expected)).toBe(true);
    });

    it('just wait-time is 0', () => {
      const currentTime = moment({ hour: 6, minute: 30 });
      const expected = list[1];
      const subject = findNextTime(list, currentTime);
      expect(subject.isSame(expected)).toBe(true);
    });

    it('between the buses', () => {
      const currentTime = moment({ hour: 8, minute: 51 });
      const expected = list[12];
      const subject = findNextTime(list, currentTime);
      expect(subject.isSame(expected)).toBe(true);
    });

    it('between dates (midnight passes)', () => {
      const currentTime = moment({ hour: 23, minute: 58 });
      const expected = list[18];
      const subject = findNextTime(list, currentTime);
      expect(subject.isSame(expected)).toBe(true);
    });

    it('just midnight', () => {
      const currentTime = moment({ hour: 0, minute: 0 });
      const expected = list[18];
      const subject = findNextTime(list, currentTime);
      expect(subject.isSame(expected)).toBe(true);
    });

    it('past midnight', () => {
      const currentTime = moment({ hour: 0, minute: 31 });
      const expected = list[19];
      const subject = findNextTime(list, currentTime);
      expect(subject.isSame(expected)).toBe(true);
    });

    it('wait last bus', () => {
      const currentTime = moment({ hour: 0, minute: 43 });
      const expected = list[20];
      const subject = findNextTime(list, currentTime);
      expect(subject.isSame(expected)).toBe(true);
    });
  });
});
