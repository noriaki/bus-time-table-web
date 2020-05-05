import { useState } from 'react';
import { createContainer } from 'unstated-next';

// libs
import {
  momentFromVersion,
  flattenTimeTable,
  sliceNextTimeList,
  isInactiveDays,
  isSuspended,
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

// createHook
export const createTimetableHook = (data) => {
  const nextTimetableState = timestamp => (currentState = defaultState) => {
    const { timetable, activeDays } = data;
    const suspensionDay = isSuspended(timestamp);
    const inactiveDay = isInactiveDays(activeDays, timestamp);
    const flatData = flattenTimeTable(timetable, timestamp);
    const nextSliceData = sliceNextTimeList(flatData, timestamp);

    const nextState = {
      ...currentState,
      suspensionDay,
      inactiveDay, // sunday, saturday, holiday
      flatData,
      sliceData: nextSliceData,
    };

    if (suspensionDay.result || inactiveDay) {
      nextState.outOfService = null;
    } else if (nextSliceData.length === 0) {
      // the last bus was gone
      nextState.outOfService = true;
    } else {
      // in service
      nextState.outOfService = false;
    }

    if (currentState.sliceData.length !== nextSliceData.length) {
      // departure time has come
      const nextIndex = currentState.index > 0 ? currentState.index - 1 : 0;
      nextState.index = nextIndex;
    }

    return nextState;
  };

  const hook = (initialState = { ...defaultState }) => {
    const [timetableState, setTimetableState] = useState(initialState);
    const {
      version,
      id,
      name,
      timetable,
    } = data;

    const tick = (timestamp) => {
      setTimetableState(nextTimetableState(timestamp));
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

    const isSuspendedDay = () => !!timetableState.suspensionDay.result;

    const suspendedReason = () => timetableState.suspensionDay.reason;

    const isClosedDay = () => !!timetableState.inactiveDay;

    const isOutOfService = () => !!timetableState.outOfService;

    const nextTime = () => {
      const { sliceData, index } = timetableState;
      return sliceData[index] || null;
    };

    const nearestTime = () => (timetableState.sliceData[0] || null);

    const lastUpdate = momentFromVersion(version);

    return {
      id,
      name,
      data: timetable,
      lastUpdate,
      state: timetableState,
      tick,
      moveFront,
      movePrev,
      moveNext,
      moveLast,
      isFront,
      isLast,
      isSuspendedDay,
      suspendedReason,
      isClosedDay,
      isOutOfService,
      nearestTime,
      nextTime,
    };
  };

  hook.buildState = nextTimetableState;
  return hook;
};

// Hooks
export const HomeTimetableHook = createTimetableHook(timetableHome);
export const HigashiGinzaTimetableHook = createTimetableHook(timetableHigashiGinza);
export const ShimbashiTimetableHook = createTimetableHook(timetableShimbashi);

// createContainer
export const createTimetableContainer = (data) => (
  createContainer(createTimetableHook(data))
);

// Containers
export const HomeTimetable = createContainer(HomeTimetableHook);
export const HigashiGinzaTimetable = createContainer(HigashiGinzaTimetableHook);
export const ShimbashiTimetable = createContainer(ShimbashiTimetableHook);

export default {
  HomeTimetable,
  HigashiGinzaTimetable,
  ShimbashiTimetable,
};
