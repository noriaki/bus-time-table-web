import React from 'react';

// material-ui
import Typography from '@material-ui/core/Typography';
// import Chip from '@material-ui/core/Chip';
import Badge from '@material-ui/core/Badge';


// styles
import useStyles, { useLastBadgeStyles } from '~/styles/GuideBoard/Departure-Style';

const Departure = ({ name, nextTime, isLast }) => {
  const classes = useStyles();
  const lastBadgeClasses = useLastBadgeStyles();

  return (
    <Typography component="h1" className={classes.root}>
      <span className={classes.departure}>
        { name }
      </span>
      <span className={classes.time}>
        { nextTime.format('HH:mm') }
      </span>
      <Badge
        badgeContent="最終"
        invisible={!isLast}
        classes={lastBadgeClasses}>
        <span className={classes.suffix}>
          発
        </span>
      </Badge>
    </Typography>
  );
};

export default Departure;
