export const headline = theme => ({
  marginTop: theme.spacing.unit * 3,
  marginBottom: theme.spacing.unit,
  fontWeight: theme.typography.headline.fontWeight * 1.4,
});

export default theme => ({
  headline: headline(theme),
});
