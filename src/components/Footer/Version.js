import React from 'react';

// material-ui components
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

// styles
import useStyles from '~/styles/Footer-Style';

const generateRepoURL = (buildId) => {
  const abbr = buildId.slice(0, 7);
  return {
    abbr,
    url: `https://github.com/noriaki/bus-time-table-web/tree/${buildId}`,
  };
};

const Version = ({ buildId }) => {
  const { version } = useStyles();

  let LinkedVersion;
  if (buildId !== 'development') {
    const { abbr, url } = generateRepoURL(buildId);
    LinkedVersion = (
      <Link href={url} color="inherit">
        {abbr}
      </Link>
    );
  }

  return (
    <p className={version}>
      <Typography component="small" variant="body2" color="textSecondary">
        version:
        { LinkedVersion || ` ${buildId}` }
      </Typography>
    </p>
  );
};

export default Version;
