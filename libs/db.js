import Dexie from 'dexie';
import moment from 'moment';
import { name } from '../package.json';

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

export const firstOrCreateReadStateOfUser = async (version) => {
  let state = await db.userStates.where('version').equals(version).first();
  if (state === undefined) {
    state = { version, isUnreadNotification: true };
    await db.userStates.add(state);
  }
  return state;
};

// @async
export const updateReadState = version => db.userStates
  .where('version').equals(version)
  .modify({ isUnreadNotification: false });

export const firstOrCreateUiState = async (stateName) => {
  let state = await db.uiStates.where('name').equals(stateName).first();
  if (state === undefined) {
    if (stateName === 'appBannerShow') {
      state = { name: stateName, state: { lastShownAt: undefined } };
    } else {
      return new Error('Not valid params. valid: enum[appBannerShow]');
    }
    await db.uiStates.add(state);
  }
  return state;
};

export const isMinimizeAppBanner = async () => {
  const { state } = await firstOrCreateUiState('appBannerShow');
  if (state.lastShownAt === undefined) { return false; }
  return moment(state.lastShownAt).add(2, 'days').isAfter(moment());
};

// @async
export const updateLastShownAt = (lastShownAt = Date.now()) => db.uiStates
  .where('name').equals('appBannerShow')
  .modify({ state: { lastShownAt } });
