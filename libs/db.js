import Dexie from 'dexie';
import { name } from '../package.json';

const db = new Dexie(`${name}-db`);
db
  .version(1)
  .stores({
    userStates: '&version, isUnreadNotification',
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
