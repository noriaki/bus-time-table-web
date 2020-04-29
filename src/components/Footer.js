import React from 'react';

// material-ui components
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

// styles
import useStyles from '~/styles/Footer-Style';

const Footer = ({ buildId }) => {
  const currentYear = new Date().getFullYear();
  const abbr = buildId.slice(0, 8);
  const repoURL = `https://github.com/noriaki/bus-time-table-web/tree/${buildId}`;

  const { root, copyright, version } = useStyles();

  return (
    <footer className={root}>
      <p className={copyright}>
        <Typography component="small" variant="body2">
          &copy;2017-
          {`${currentYear} `}
          noriaki
        </Typography>
      </p>
      <p className={version}>
        <Typography component="small" variant="body2" color="textSecondary">
          version:
          <Link href={repoURL} color="inherit">
            {abbr}
          </Link>
        </Typography>
      </p>
    </footer>
  );
};

export default Footer;
