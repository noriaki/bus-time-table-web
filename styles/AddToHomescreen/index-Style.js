export default (theme) => {
  const { unit } = theme.spacing;
  const greyBackground = {
    backgroundColor: theme.palette.grey[300],
  };
  return ({
    dialogTitle: {
      ...greyBackground,
      paddingLeft: unit * 2,
      paddingRight: unit * 2,
    },
    dialogContent: {
      paddingLeft: unit * 2,
      paddingRight: unit * 2,
    },
    dialogActions: {
      ...greyBackground,
      margin: 0,
      padding: [unit, unit / 2],
    },
  });
};
