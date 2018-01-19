import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import SvgIcon from 'material-ui/SvgIcon';
import InfoIcon from 'material-ui-icons/InfoOutline';

// styles
import NotifiableInfoIconStyles from '../styles/NotifiableInfoIcon-Style';

const NotifiableInfoIcon = ({ badge, classes, theme }) => {
  if (badge) {
    return (
      <span className={classes.container}>
        <InfoIcon />
        <SvgIcon className={classes.badge}>
          <circle cx={12} cy={12} r={5} fill={theme.palette.secondary.A200} />
        </SvgIcon>
      </span>
    );
  }
  return <InfoIcon />;
};
NotifiableInfoIcon.propTypes = { badge: PropTypes.bool };
NotifiableInfoIcon.defaultProps = { badge: false };

const enhance = withStyles(NotifiableInfoIconStyles, { withTheme: true });

export default enhance(NotifiableInfoIcon);
