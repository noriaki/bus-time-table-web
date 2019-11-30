import React from 'react';

// material-ui
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// material-icon
import NotificationsIcon from '@material-ui/icons/Notifications';

// styles
import { makeStyles } from '@material-ui/core/styles';
import { silver } from '~/contexts/mui/themes/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    margin: theme.spacing(1),
    display: 'block',
    color: silver,
  },
  text: {
    flexGrow: 1,
  },
}));

const Notice = () => {
  const classes = useStyles();

  return (
    <Paper square elevation={0} className={classes.root}>
      <NotificationsIcon className={classes.icon} />
      <Typography variant="body2" className={classes.text}>
        12/2
        <Typography component="span" variant="caption">(月)</Typography>
        からの新時刻表に対応しました
      </Typography>
    </Paper>
  );
};

export default Notice;
