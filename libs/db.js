import Dexie from 'dexie';
import { name } from '../package.json';

const db = new Dexie(`${name}-db`);
db
  .version(1)
  .stores({
    userStates: '&version, isUnreadNotification',
  });

export default db;
