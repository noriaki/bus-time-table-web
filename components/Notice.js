import React from 'react';

// material-ui
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// material-icon
import NotificationsIcon from '@material-ui/icons/Notifications';

// styles
import { makeStyles } from '@material-ui/core/styles';

// components
import Link from '~/components/NextLinkComposed';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    margin: theme.spacing(1),
    display: 'block',
    color: 'gray',
  },
  text: {
    flexGrow: 1,
    display: 'inline-flex',
    alignItems: 'baseline',
  },
  link: {
    padding: 0,
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
        より
        <Button
          disableRipple
          color="secondary"
          className={classes.link}
          component={Link}
          naked
          href="/future">
          新しい時刻表
        </Button>
        に変わります
      </Typography>
    </Paper>
  );
};

export default Notice;
