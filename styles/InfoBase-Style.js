export const headline = theme => ({
  marginTop: theme.spacing.unit * 3,
  marginBottom: theme.spacing.unit,
});

export default theme => ({
  headline: headline(theme),
});
