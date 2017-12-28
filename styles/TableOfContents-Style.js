export const container = theme => ({
  borderLeft: '5px solid',
  borderLeftColor: theme.palette.secondary['600'],
  paddingLeft: theme.spacing.unit * 2,
  marginTop: theme.spacing.unit,
  marginBottom: theme.spacing.unit * 3,
});

export const header = theme => ({
  fontSize: theme.typography.pxToRem(14),
});

export const ul = {
  listStyle: 'none',
  marginTop: 0,
  paddingLeft: 0,
};

export const li = {};

export const link = theme => ({
  fontSize: theme.typography.pxToRem(18),
});

export default theme => ({
  container: container(theme),
  header: header(theme),
  ul,
  li,
  link: link(theme),
});
