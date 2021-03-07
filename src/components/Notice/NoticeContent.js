import React from 'react';

// material-ui
import Typography from '@material-ui/core/Typography';

// styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  text: {
    flexGrow: 1,
    fontSize: '85%',
  },
});

const NoticeContent = ({ contents }) => {
  const classes = useStyles();

  return (
    <div>
      {contents.map((content) => (
        <Typography key={content} variant="body2" className={classes.text}>
          {content}
        </Typography>
      ))}
    </div>
  );
};

export default NoticeContent;
