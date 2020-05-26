import React from 'react';

// material-ui
import Paper from '@material-ui/core/Paper';

// material-icon
import NotificationsIcon from '@material-ui/icons/Notifications';

// styles
import { makeStyles } from '@material-ui/core/styles';
import { silver } from '~/contexts/mui/themes/colors';

// hooks
import useNotice from '~/hooks/useNotice';

// components
import NoticeContent from './NoticeContent';

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
  const { hasNotice, contents } = useNotice();

  if (hasNotice === false) { return null; }

  return (
    <Paper square elevation={0} className={classes.root}>
      <NotificationsIcon className={classes.icon} />
      <NoticeContent contents={contents} />
    </Paper>
  );
};

export default Notice;
