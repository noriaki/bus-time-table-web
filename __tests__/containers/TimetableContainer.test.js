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
    expect(container.current.state.inactiveDay).toBe(true);
  });

  it('the last bus was gone', () => {
    currentTime.hour(3);
    act(() => container.current.tick(currentTime));
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
});
