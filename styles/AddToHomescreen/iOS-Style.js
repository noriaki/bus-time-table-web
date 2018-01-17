export const title = theme => ({
  marginTop: theme.spacing.unit * 3,
  marginBottom: theme.spacing.unit,
});

export const container = {
  listStyleType: 'none',
  margin: 0,
  paddingLeft: 0,
};

export const item = theme => ({
  marginBottom: theme.spacing.unit * 2,
});

export default theme => ({
  title: title(theme),
  container,
  item: item(theme),
});
