export const container = theme => ({
  width: `calc(100vw - ${theme.spacing.unit * 2}px)`,
});

export default theme => ({
  container: container(theme),
});
