export const container = theme => ({
  position: 'relative',
  height: theme.spacing.unit * 3,
});

export const badge = {
  position: 'absolute',
  top: 0,
  left: 0,
  transform: 'translate(50%, -50%)',
};

export default theme => ({
  container: container(theme),
  badge,
});
