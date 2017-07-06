import { white, grey500 } from 'material-ui/styles/colors';
import { blueSky, premiumBlack, silver } from '../themes/colors';

export const timeTable = {
  borderTop: `2px solid ${premiumBlack}`,
  borderBottom: `2px solid ${premiumBlack}`,
};
export const row = {
  height: 24,
};
export const baseColumn = {
  textAlign: 'center',
  height: 18,
  paddingLeft: 0,
  paddingRight: 0,
};
export const dividerColumn = {
  backgroundColor: white,
  textAlign: 'center',
};
export const noteColumn = {
  backgroundColor: white,
  height: 13,
  paddingLeft: '0.5em',
  fontSize: 11,
  color: grey500,
};
export const hourColumn = {
  color: silver,
  backgroundColor: premiumBlack,
};
export const targetColumn = {
  backgroundColor: blueSky,
  color: white,
  fontWeight: 'lighter',
};

export default {
  timeTable,
  row,
  dividerColumn,
  baseColumn,
  noteColumn,
  hourColumn,
  targetColumn,
};
