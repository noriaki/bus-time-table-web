export default (theme) => {
  const { unit } = theme.spacing;
  const { pxToRem } = theme.typography;
  const { secondary } = theme.palette;

  return {
    container: {
      borderLeft: '5px solid',
      borderLeftColor: secondary.main,
      paddingLeft: unit * 2,
      marginTop: unit,
      marginBottom: unit * 3,
    },

    header: { fontSize: pxToRem(14) },

    ul: {
      listStyle: 'none',
      marginTop: 0,
      paddingLeft: 0,
    },

    li: {},

    link: { fontSize: pxToRem(18) },
  };
};
