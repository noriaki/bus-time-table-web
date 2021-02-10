import Dexie from 'dexie';
import moment from 'moment';
import { name } from '../../package.json';

const db = new Dexie(`${name}-db`);
db
  .version(1)
  .stores({
    userStates: '&version, isUnreadNotification',
  });

db
  .version(2)
  .stores({
    userStates: '&version',
    uiStates: '&name',
  });

export default db;

// userStates
export const firstOrCreateReadStateOfUser = async (version) => {
  let state = await db.userStates.where('version').equals(version).first();
  if (state === undefined) {
    state = { version, isUnreadNotification: true };
    await db.userStates.add(state);
  }
  return state;
};

// userStates
// @async
export const updateReadState = (version) => db.userStates
  .where('version').equals(version)
  .modify({ isUnreadNotification: false });

// uiStates
export const firstOrCreateUiState = async (stateName) => {
  let state = await db.uiStates.where('name').equals(stateName).first();
  if (state === undefined) {
    if (stateName === 'appBannerShow') {
      state = { name: stateName, state: { lastShownAt: undefined } };
    } else if (stateName === 'timetableCollapse') {
      state = {
        name: stateName,
        state: {
          Home: false,
          HigashiGinza: false,
          Shimbashi: false,
        },
      };
    } else {
      return new Error(
        'Not valid params. valid: enum[appBannerShow, timetableCollapse]'
      );
    }
    await db.uiStates.add(state);
  }
  return state;
};

// uiStates.appBannerShow
export const isMinimizeAppBanner = async () => {
  const { state } = await firstOrCreateUiState('appBannerShow');
  if (state.lastShownAt === undefined) { return false; }
  return moment(state.lastShownAt).add(2, 'days').isAfter(moment());
};

// uiStates.appBannerShow
// @async
export const updateLastShownAt = (lastShownAt = Date.now()) => (
  db.uiStates
    .where('name').equals('appBannerShow')
    .modify({ state: { lastShownAt } })
);

// uiStates.timetableCollapse
export const isTimetableCollapse = async (timetableId) => {
  const { state } = await firstOrCreateUiState('timetableCollapse');
  return state[timetableId];
};

// uiStates.timetableCollapse
// @async
export const updateTimetableCollapse = async (timetableId, collapse) => {
  const { state } = await firstOrCreateUiState('timetableCollapse');
  state[timetableId] = collapse;
  return db.uiStates
    .where('name').equals('timetableCollapse')
    .modify({ state });
};
