export default (theme) => {
  const { unit } = theme.spacing;
  const { pxToRem } = theme.typography;
  const container = {
    margin: 0,
    fontSize: pxToRem(16),
    fontWeight: 'normal',
  };

  const departure = {
  };

  const time = {
    fontSize: pxToRem(18),
    margin: `0 ${unit}px`,
  };

  const suffix = {
    fontSize: pxToRem(12),
  };

  const sign = {
    ...suffix,
    marginLeft: unit,
    color: '#f44336', // material color red[500]
  };

  return {
    container,
    departure,
    time,
    suffix,
    sign,
  };
};
