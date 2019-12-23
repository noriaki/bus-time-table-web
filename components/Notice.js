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
        12/28
        <Typography component="span" variant="caption">(土)</Typography>
        〜1/5
        <Typography component="span" variant="caption">(日)</Typography>
        は年末年始運休です
      </Typography>
    </Paper>
  );
};

export default Notice;
