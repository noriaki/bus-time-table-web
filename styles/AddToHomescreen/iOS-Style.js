import { headline } from '../InfoBase-Style';

export const container = {
  listStyleType: 'none',
  margin: 0,
  paddingLeft: 0,
};
export const item = theme => ({
  marginBottom: theme.spacing.unit * 2,
});

export default theme => ({
  headline: headline(theme),
  container,
  item: item(theme),
});
