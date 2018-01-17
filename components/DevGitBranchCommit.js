import React from 'react';
import Typography from 'material-ui/Typography';

const AppInformation = ({ className = null }) => (
  process.env.GIT_BRANCH != null && process.env.GIT_BRANCH !== 'master' ? (
    <Typography type="body1" align="right" className={className}>
      {process.env.GIT_BRANCH} #{process.env.GIT_COMMIT.slice(0, 7)}
    </Typography>
  ) : null
);
export default AppInformation;
