import React from 'react';

// material-ui components
import Typography from '@material-ui/core/Typography';

// components
import Version from './Version';

// styles
import useStyles from '~/styles/Footer-Style';

const Footer = ({ buildId }) => {
  const currentYear = new Date().getFullYear();

  const { root, copyright } = useStyles();

  return (
    <footer className={root}>
      <p className={copyright}>
        <Typography component="small" variant="body2">
          &copy;2017-
          {`${currentYear} `}
          noriaki
        </Typography>
      </p>
      <Version buildId={buildId} />
    </footer>
  );
};

export default Footer;
