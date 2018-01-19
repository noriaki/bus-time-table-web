export const root = theme => ({
  position: 'fixed',
  right: 0,
  bottom: theme.mixins.toolbar.minHeight,
  marginRight: theme.spacing.unit,
  marginBottom: theme.spacing.unit,
});

export const raisedAccent = (theme) => {
  const baseProps = {
    backgroundColor: theme.palette.secondary[100],
    color: theme.palette.secondary[900],
  };
  return ({
    ...baseProps,
    '&:hover': { ...baseProps },
  });
};

export const icon = theme => ({
  marginRight: theme.spacing.unit,
});

export default theme => ({
  root: root(theme),
  raisedAccent: raisedAccent(theme),
  icon: icon(theme),
});
