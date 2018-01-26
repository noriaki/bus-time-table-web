export default (theme) => {
  const { unit } = theme.spacing;
  const toolbarMinHeight = theme.mixins.toolbar.minHeight;
  const secondaryColor = theme.palette.secondary;
  const baseRaisedAccent = {
    backgroundColor: secondaryColor[100],
    color: secondaryColor[900],
  };

  return ({
    root: {
      position: 'fixed',
      right: 0,
      bottom: toolbarMinHeight,
      marginRight: unit,
      marginBottom: unit,
      minWidth: unit * 3,
    },
    raisedAccent: {
      ...baseRaisedAccent,
      '&:hover': { ...baseRaisedAccent },
    },
  });
};
