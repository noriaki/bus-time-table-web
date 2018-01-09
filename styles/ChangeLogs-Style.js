import { headline } from './InfoBase-Style';

export const card = theme => ({
  marginBottom: theme.spacing.unit * 2,
});

export const badge = {
  right: 'auto',
  left: -24,
  top: -24,
  width: 36,
};

export const subjects = {
  margin: 0,
};

export const subject = theme => ({
  marginBottom: theme.spacing.unit,
});

export default theme => ({
  headline: headline(theme),
  card: card(theme),
  badge,
  subjects,
  subject: subject(theme),
});
