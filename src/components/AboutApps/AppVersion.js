import React from 'react';

// material-ui
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const AppVersion = ({ version, date, subjects }) => {
  const headerText = `最近のアップデート：${date} (${version})`;
  const latestChangelog = subjects.map((subject) => (
    <ListItem key={subject} dense>
      <ListItemText
        style={{ margin: 0 }}
        secondaryTypographyProps={{ variant: 'caption' }}
        secondary={subject}
      />
    </ListItem>
  ));

  return (
    <>
      <Typography component="h3" variant="body2">
        {headerText}
      </Typography>
      <List disablePadding>{latestChangelog}</List>
    </>
  );
};

export default AppVersion;
