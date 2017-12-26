export const rootCardContent = {
  display: 'grid',
  gridGap: '4px',
  gridTemplateColumns: '1.5fr 1fr 1fr',
};

const leftGrid = { gridColumn: '1 / 2' };
const centerGrid = { gridColumn: '2 / 3' };
const rightGrid = { gridColumn: '3 / 4' };

const leftColspanGrid = { gridColumn: '1 / 3' };
const rightColspanGrid = { gridColumn: '2 / 4' };

export const appVersionTerm = {
  ...leftColspanGrid,
};

export const timetableUpdateTerm = {
  ...leftGrid,
  gridRow: '2 / 5',
};

const timetableUpdateHomeGrid = {
  gridRow: '2 / 3',
};
export const timetableUpdateHomeTerm = {
  ...centerGrid,
  ...timetableUpdateHomeGrid,
};
export const timetableUpdateHomeVersion = {
  ...rightGrid,
  ...timetableUpdateHomeGrid,
};

const timetableUpdateHigashiGinzaGrid = {
  gridRow: '3 / 4',
};
export const timetableUpdateHigashiGinzaTerm = {
  ...centerGrid,
  ...timetableUpdateHigashiGinzaGrid,
};
export const timetableUpdateHigashiGinzaVersion = {
  ...rightGrid,
  ...timetableUpdateHigashiGinzaGrid,
};

const timetableUpdateShimbashiGrid = {
  gridRow: '4 / 5',
};
export const timetableUpdateShimbashiTerm = {
  ...centerGrid,
  ...timetableUpdateShimbashiGrid,
};
export const timetableUpdateShimbashiVersion = {
  ...rightGrid,
  ...timetableUpdateShimbashiGrid,
};

export const authorTerm = {
  ...leftColspanGrid,
};

export default {
  rootCardContent,
  appVersionTerm,
  timetableUpdateTerm,
  timetableUpdateHomeTerm,
  timetableUpdateHomeVersion,
  timetableUpdateHigashiGinzaTerm,
  timetableUpdateHigashiGinzaVersion,
  timetableUpdateShimbashiTerm,
  timetableUpdateShimbashiVersion,
  authorTerm,
};
