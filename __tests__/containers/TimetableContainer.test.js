import { renderHook, act } from 'react-hooks-testing-library';
import moment from 'moment';

import { ShimbashiTimetableHook } from '~/containers/TimetableContainer';

describe('ShimbashiTimetable Container', () => {
  let currentTime;
  let container;
  beforeEach(() => {
    currentTime = moment('2017-06-15', 'YYYY-MM-DD');
    container = renderHook(() => ShimbashiTimetableHook()).result;
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
    currentTime.day('sunday').hour(8);
    act(() => container.current.tick(currentTime));
    expect(container.current.isClosedDay()).toBe(true);
    expect(container.current.state.inactiveDay).toBe(true);
  });

  it('the last bus was gone', () => {
    currentTime.hour(3);
    act(() => container.current.tick(currentTime));
    expect(container.current.isOutOfService()).toBe(true);
    expect(container.current.state.outOfService).toBe(true);
  });

  it('departure time has come', () => {
    currentTime.set({ hour: 21, minute: 9, second: 30 });
    act(() => container.current.tick(currentTime));
    expect(container.current.state.sliceData).toHaveLength(6);

    currentTime.set({ minute: 10 });
    act(() => container.current.tick(currentTime));
    expect(container.current.state.sliceData).toHaveLength(5);
  });

  describe('when time has changed', () => {
    it('in service -> last bus gone', () => {
      currentTime.set({ hour: 23, minute: 29, second: 30 });
      act(() => container.current.tick(currentTime));
      expect(container.current.state.sliceData).toHaveLength(1);

      currentTime.set({ minute: 30 });
      act(() => container.current.tick(currentTime));
      expect(container.current.state.sliceData).toHaveLength(0);
      expect(container.current.isOutOfService()).toBe(true);

      expect(container.current.isClosedDay()).toBe(false);
    });

    it('last bus gone -> inactive day', () => {
      currentTime.set({ hour: 23, minute: 30, second: 30 });
      act(() => container.current.tick(currentTime));
      expect(container.current.isOutOfService()).toBe(true);
      expect(container.current.isClosedDay()).toBe(false);

      currentTime.set({ date: 17, hour: 7 });
      act(() => container.current.tick(currentTime));
      expect(container.current.isOutOfService()).toBeFalsy();
      expect(container.current.isClosedDay()).toBe(true);
    });

    it('last bus gone -> in service', () => {
      currentTime.set({ hour: 23, minute: 30, second: 30 });
      act(() => container.current.tick(currentTime));
      expect(container.current.isOutOfService()).toBe(true);

      currentTime.set({ date: 16, hour: 7 });
      act(() => container.current.tick(currentTime));
      expect(container.current.isOutOfService()).toBe(false);

      expect(container.current.isClosedDay()).toBe(false);
    });

    it('inactive day -> in service', () => {
      currentTime.set({ date: 18, hour: 7 });
      act(() => container.current.tick(currentTime));
      expect(container.current.isOutOfService()).toBeFalsy();
      expect(container.current.isClosedDay()).toBe(true);

      currentTime.set({ date: 19 });
      act(() => container.current.tick(currentTime));
      expect(container.current.isClosedDay()).toBe(false);
      expect(container.current.isOutOfService()).toBeFalsy();
    });
  });
});
