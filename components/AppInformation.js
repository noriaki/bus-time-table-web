import React from 'react';
import Typography from 'material-ui/Typography';

const AppInformation = () => (
  process.env.GIT_BRANCH != null && process.env.GIT_BRANCH !== '' ? (
    <Typography type="body1" align="right">
      {process.env.GIT_BRANCH}
      <br />
      #{process.env.GIT_COMMIT.slice(0, 7)}
    </Typography>
  ) : null
);
export default AppInformation;
