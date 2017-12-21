import React from 'react';
import Typography from 'material-ui/Typography';

const AppInformation = () => (
  global.BRANCH != null && global.BRANCH !== '' ? (
    <Typography type="body1" align="right">
      {BRANCH}
      <br />
      #{COMMIT.slice(0, 7)}
    </Typography>
  ) : null
);
export default AppInformation;
