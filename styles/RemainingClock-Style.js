import { red500 } from 'material-ui/styles/colors';

export const container = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
  marginBottom: 10,
};
export const boardContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  marginRight: 5,
};
export const departure = {
  marginLeft: 5,
  fontSize: 14,
  fontWeight: 'bold',
};
export const last = {
  color: red500,
  fontWeight: 'normal',
  fontSize: 12,
  marginRight: '0.5em',
};
export const destination = {
  marginLeft: 5,
  fontSize: 13,
};
export const timer = {
  fontSize: 25,
  fontWeight: 'bold',
  marginLeft: 5,
};
export const suffix = {
  fontSize: 10,
  fontWeight: 'normal',
};
export const notice = {
  fontSize: 13,
  textAlign: 'center',
};

export default {
  container,
  boardContainer,
  departure,
  last,
  destination,
  timer,
  suffix,
  notice,
};
