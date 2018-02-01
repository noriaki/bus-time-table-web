import { darken, lighten } from 'material-ui/styles/colorManipulator';

export default (theme) => {
  const { unit } = theme.spacing;
  const toolbarMinHeight = theme.mixins.toolbar.minHeight;
  const mainColor = theme.palette.secondary.main;
  const baseRaisedAccent = {
    backgroundColor: lighten(mainColor, 0.7),
    color: darken(mainColor, 0.33),
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
