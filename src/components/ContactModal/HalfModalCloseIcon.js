import React from 'react';
import clsx from 'clsx';

// material-ui
import Grid from '@material-ui/core/Grid';

// styles
import useStyles from '~/styles/ContactModal/HalfModalCloseIcon-Style';

const HalfModalCloseIcon = ({ onClick: handleClick }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      onClick={handleClick}
      className={classes.root}>
      <div className={clsx(classes.border, classes.left)} />
      <div className={clsx(classes.border, classes.right)} />
    </Grid>
  );
};

export default HalfModalCloseIcon;
