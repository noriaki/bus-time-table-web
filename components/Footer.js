import React from 'react';

// material-ui components
import Typography from '@material-ui/core/Typography';

// styles
import useStyles from '~/styles/Footer-Style';

const Footer = () => {
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
    </footer>
  );
};

export default Footer;
