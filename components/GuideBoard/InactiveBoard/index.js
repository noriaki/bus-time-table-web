import React from 'react';

// material-ui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// styles
import useDepartureStyles from '~/styles/GuideBoard/Departure-Style';

const InactiveBoard = ({ timetable }) => {
  const { name } = timetable;

  const { departure, suffix } = useDepartureStyles();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center">
      <Grid item>
        <Typography component="h1">
          <span className={departure}>{ name }</span>
          <span className={suffix}>発</span>
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
  );
};

export default InactiveBoard;
