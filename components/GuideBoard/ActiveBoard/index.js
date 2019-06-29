import React from 'react';

// material-ui
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// material-ui icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

// components
import Departure from './Departure';
import CountDownClock from './CountDownClock';

// styles
import useStyles from '~/styles/GuideBoard/ActiveBoard-Style';

const ActiveBoard = ({ timetable, currentTime, nextTime, mini }) => {
  const remaining = nextTime.valueOf() - currentTime;

  const classes = useStyles({ mini });

  return (
    <Grid container justify="space-between">
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.content}
        item>
        <Grid item>
          <Departure
            name={timetable.name}
            nextTime={nextTime}
            isLast={timetable.isLast()} />
        </Grid>
        <Grid item>
          <CountDownClock remaining={remaining} />
        </Grid>
      </Grid>
      <Grid component="nav" item className={classes.prevButton}>
        <Button
          color="secondary"
          disabled={timetable.isFront()}
          classes={{ root: classes.buttonRoot, label: classes.buttonLabel }}
          onClick={() => timetable.movePrev()}>
          <span>前発</span>
          <ChevronLeftIcon className={classes.prevIcon} />
        </Button>
      </Grid>
      <Grid component="nav" item>
        <Button
          color="secondary"
          disabled={timetable.isLast()}
          classes={{ root: classes.buttonRoot, label: classes.buttonLabel }}
          onClick={() => timetable.moveNext()}>
          <span>次発</span>
          <ChevronRightIcon />
        </Button>
      </Grid>
    </Grid>
  );
};

export default ActiveBoard;
