export const button = {
  height: null,
  lineHeight: null,
  minWidth: null,
};
export const buttonLeft = {
  ...button,
  paddingRight: 16,
};
export const buttonRight = {
  ...button,
  paddingLeft: 16,
};

export const container = {
  display: 'inline-flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
};
export const navigation = {
  fontSize: 6,
  width: '3em',
};

export default {
  button,
  buttonLeft,
  buttonRight,
  container,
  navigation,
};
