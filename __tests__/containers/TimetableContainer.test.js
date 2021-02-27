import { renderHook, act } from '@testing-library/react-hooks';

import dayjs, { SUN } from '~/libs/dayjs';
import testTimetable from './fixtures/timetable.json';
import { createTimetableHook } from '~/containers/TimetableContainer';

const TestTimetableHook = createTimetableHook(testTimetable);

describe('TestTimetable Container', () => {
  let baseTime;
  let container;
  beforeEach(() => {
    baseTime = dayjs('2017-06-15', 'YYYY-MM-DD');
    container = renderHook(() => TestTimetableHook()).result;
  });

  it('default state', () => {
    const expected = {
      flatData: null,
      sliceData: [],
      index: null,
      inactiveDay: null,
      outOfService: null,
    };
    expect(container.current.state).toEqual(expected);
  });

  it('inactive day', () => {
    const currentTime = baseTime.day(SUN).hour(8);
    act(() => container.current.tick(currentTime));
    expect(container.current.isClosedDay()).toBe(true);
    expect(container.current.state.inactiveDay).toBe(true);
  });

  it('the last bus was gone', () => {
    const currentTime = baseTime.hour(3);
    act(() => container.current.tick(currentTime));
    expect(container.current.isOutOfService()).toBe(true);
    expect(container.current.state.outOfService).toBe(true);
  });

  it('departure time has come', () => {
    const expectedLength = 7;

    let currentTime = baseTime.set({ hour: 21, minute: 9, second: 30 });
    act(() => container.current.tick(currentTime));
    expect(container.current.state.sliceData).toHaveLength(expectedLength);

    currentTime = currentTime.set({ minute: 10 });
    act(() => container.current.tick(currentTime));
    expect(container.current.state.sliceData).toHaveLength(expectedLength - 1);
  });

  describe('when time has changed', () => {
    it('in service -> last bus gone', () => {
      let currentTime = baseTime.set({ hour: 24, minute: 4, second: 30 });
      act(() => container.current.tick(currentTime));
      expect(container.current.state.sliceData).toHaveLength(1);

      currentTime = currentTime.set({ minute: 5 });
      act(() => container.current.tick(currentTime));
      expect(container.current.state.sliceData).toHaveLength(0);
      expect(container.current.isOutOfService()).toBe(true);

      expect(container.current.isClosedDay()).toBe(false);
    });

    it('last bus gone -> inactive day', () => {
      let currentTime = baseTime.set({ hour: 24, minute: 5, second: 30 });
      act(() => container.current.tick(currentTime));
      expect(container.current.isOutOfService()).toBe(true);
      expect(container.current.isClosedDay()).toBe(false);

      currentTime = currentTime.set({ date: 17, hour: 7 });
      act(() => container.current.tick(currentTime));
      expect(container.current.isOutOfService()).toBeFalsy();
      expect(container.current.isClosedDay()).toBe(true);
    });

    it('last bus gone -> in service', () => {
      let currentTime = baseTime.set({ hour: 24, minute: 5, second: 30 });
      act(() => container.current.tick(currentTime));
      expect(container.current.isOutOfService()).toBe(true);

      currentTime = currentTime.set({ date: 16, hour: 7 });
      act(() => container.current.tick(currentTime));
      expect(container.current.isOutOfService()).toBe(false);

      expect(container.current.isClosedDay()).toBe(false);
    });

    it('inactive day -> in service', () => {
      let currentTime = baseTime.set({ date: 18, hour: 7 });
      act(() => container.current.tick(currentTime));
      expect(container.current.isOutOfService()).toBeFalsy();
      expect(container.current.isClosedDay()).toBe(true);

      currentTime = currentTime.set({ date: 19 });
      act(() => container.current.tick(currentTime));
      expect(container.current.isClosedDay()).toBe(false);
      expect(container.current.isOutOfService()).toBeFalsy();
    });
  });
});
