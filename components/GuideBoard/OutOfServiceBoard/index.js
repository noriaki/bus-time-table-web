import React from 'react';

// material-ui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// styles
import useStyles from '~/styles/GuideBoard/OutOfServiceBoard-Style';

const OutOfServiceBoard = ({ timetable }) => {
  const { name } = timetable;

  const classes = useStyles();

  return (
    <Grid
      key="outOfServiceBoard"
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
          本日のバスは終了しました
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="caption">
          (明日以降は時刻表を参照)
        </Typography>
      </Grid>
    </Grid>
  );
};

export default OutOfServiceBoard;
