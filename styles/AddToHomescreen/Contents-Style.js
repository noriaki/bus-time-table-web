export const container = theme => ({
  padding: theme.spacing.unit,
});

export const caption = {
  display: 'inline',
};

export default theme => ({
  container: container(theme),
  caption,
});
