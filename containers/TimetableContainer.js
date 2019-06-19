import { useState } from 'react';
import { createContainer } from 'unstated-next';

// libs
import {
  momentFromVersion,
  flattenTimeTable,
  sliceNextTimeList,
  isInactiveDays,
} from '~/libs/timeTableDataHandler';

// data
import timetableHome from '~/data/home-timetable.json';
import timetableHigashiGinza from '~/data/st-higashiginza-timetable.json';
import timetableShimbashi from '~/data/st-shimbashi-timetable.json';

const defaultState = {
  flatData: null,
  sliceData: [],
  index: null,
  inactiveDay: null,
  outOfService: null,
};

const createTimetableHook = data => (initialState = { ...defaultState }) => {
  const [timetableState, setTimetableState] = useState(initialState);
  const {
    id, name, timetable, version, activeDays,
  } = data;

  const tick = (timestamp) => {
    const inactiveDay = isInactiveDays(activeDays, timestamp);
    const flatData = flattenTimeTable(timetable, timestamp);
    const nextSliceData = sliceNextTimeList(flatData, timestamp);

    // initialize
    const nextState = { ...timetableState };
    let updated = false;

    if (inactiveDay) {
      // sunday, saturday, holiday
      Object.assign(nextState, { inactiveDay });
      updated = true;
    } else if (nextSliceData.length === 0) {
      // the last bus was gone
      Object.assign(nextState, { outOfService: true });
      updated = true;
    } else if (nextState.sliceData.length !== nextSliceData.length) {
      // departure time has come
      const nextIndex = nextIndex > 0 ? nextIndex - 1 : 0;
      Object.assign(nextState, {
        sliceData: nextSliceData, index: nextIndex,
      });
      updated = true;
    }

    // update state if needed
    if (updated) { setTimetableState(nextState); }
  };

  const moveFront = () => setTimetableState(
    state => ({ ...state, index: 0 })
  );

  const movePrev = () => setTimetableState(
    state => ({ ...state, index: state.index - 1 })
  );

  const moveNext = () => setTimetableState(
    state => ({ ...state, index: state.index + 1 })
  );

  const moveLast = () => setTimetableState(
    state => ({ ...state, index: state.sliceData.length - 1 })
  );

  const isFront = () => timetableState.index === 0;

  const isLast = () => (
    timetableState.index === timetableState.sliceData.length - 1
  );

  const nextTime = () => {
    const { sliceData, index } = timetableState;
    return sliceData[index] || null;
  };

  const lastUpdate = momentFromVersion(version);

  return {
    id,
    name,
    lastUpdate,
    state: timetableState,
    tick,
    moveFront,
    movePrev,
    moveNext,
    moveLast,
    isFront,
    isLast,
    nextTime,
  };
};

// Hooks
export const HomeTimetableHook = createTimetableHook(timetableHome);
export const HigashiGinzaTimetableHook = createTimetableHook(timetableHigashiGinza);
export const ShimbashiTimetableHook = createTimetableHook(timetableShimbashi);

// Containers
export const HomeTimetable = createContainer(HomeTimetableHook);
export const HigashiGinzaTimetable = createContainer(HigashiGinzaTimetableHook);
export const ShimbashiTimetable = createContainer(ShimbashiTimetableHook);

export default {
  HomeTimetable,
  HigashiGinzaTimetable,
  ShimbashiTimetable,
};
