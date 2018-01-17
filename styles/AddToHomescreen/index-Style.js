export default (theme) => {
  const { unit } = theme.spacing;
  const greyBackground = {
    backgroundColor: theme.palette.grey[300],
  };
  return ({
    dialogTitle: {
      ...greyBackground,
    },
    dialogActions: {
      ...greyBackground,
      margin: 0,
      padding: `${unit}px ${unit / 2}px`,
    },
  });
};
