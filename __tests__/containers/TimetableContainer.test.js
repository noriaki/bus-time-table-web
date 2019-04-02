import moment from 'moment';

import TimetableContainer, { createContainer } from '~/containers/TimetableContainer';

import timetableShimbashi from '~/data/st-shimbashi-timetable.json';

describe(TimetableContainer, () => {
  let currentTime;
  let container;
  beforeEach(() => {
    currentTime = moment('2017-06-15', 'YYYY-MM-DD');
    const Container = createContainer(timetableShimbashi);
    container = new Container();
  });

  it('default state', () => {
    container.tick(currentTime);
    const expected = {
      flatData: null,
      sliceData: [],
      index: null,
      inactiveDay: null,
      outOfService: null,
    };
    expect(container.state).toEqual(expected);
  });

  it('inactive day', async () => {
    currentTime.day('sunday').hour(8);
    await container.tick(currentTime);
    expect(container.state.inactiveDay).toBe(true);
  });

  it('the last bus was gone', async () => {
    currentTime.hour(3);
    await container.tick(currentTime);
    expect(container.state.outOfService).toBe(true);
  });

  it('departure time has come', async () => {
    currentTime.set({ hour: 21, minute: 9, second: 30 });
    await container.tick(currentTime);
    expect(container.state.sliceData).toHaveLength(6);

    currentTime.set({ minute: 10 });
    await container.tick(currentTime);
    expect(container.state.sliceData).toHaveLength(5);
  });
});
