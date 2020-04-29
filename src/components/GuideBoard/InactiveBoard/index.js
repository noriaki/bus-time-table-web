import React from 'react';

// material-ui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// styles
import useStyles from '~/styles/GuideBoard/InactiveBoard-Style';

const InactiveBoard = ({ timetable }) => {
  const { name } = timetable;

  const classes = useStyles();

  return (
    <Grid container justify="space-between">
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        item>
        <Grid item>
          <Typography component="h1">
            <span className={classes.departure}>{ name }</span>
            <span className={classes.suffix}>発</span>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">
            本日バス運行はありません
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="caption">
            (運行は土日祝を除く平日のみ)
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InactiveBoard;
