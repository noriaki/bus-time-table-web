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
      <div>
        <Typography variant="body2" className={classes.text}>
          4/8
          <Typography component="span" variant="caption">(水)</Typography>
          から東京都緊急事態措置の影響で一時運休中です。
        </Typography>
        <Typography variant="body2" className={classes.text}>
          再開時期は未定で、管理組合が行政の見解を待って別途告知予定です。
        </Typography>
      </div>
    </Paper>
  );
};

export default Notice;
