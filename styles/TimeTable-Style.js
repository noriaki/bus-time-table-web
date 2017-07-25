import { white, grey500 } from 'material-ui/styles/colors';
import { lighten } from 'material-ui/utils/colorManipulator';
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
  ...baseColumn,
  backgroundColor: blueSky,
  color: white,
  fontWeight: 'lighter',
};
export const nextTargetColumn = {
  ...baseColumn,
  backgroundColor: lighten(blueSky, 0.65),
};

export default {
  timeTable,
  row,
  dividerColumn,
  baseColumn,
  noteColumn,
  hourColumn,
  targetColumn,
  nextTargetColumn,
};
