export default (theme) => {
  const { unit } = theme.spacing;
  const { minHeight } = theme.mixins.toolbar;
  return ({
    paper: {
      maxHeight: `calc(100vh - ${(minHeight * 2) + (unit * 5)}px)`,
    },
  });
};
