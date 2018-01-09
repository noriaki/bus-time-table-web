export const departure = theme => ({
  fontSize: theme.typography.pxToRem(16),
});

export const suffix = theme => ({
  fontSize: theme.typography.pxToRem(12),
});

export default theme => ({
  departure: departure(theme),
  suffix: suffix(theme),
});
