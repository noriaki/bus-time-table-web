import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { lighten } from 'material-ui/styles/colorManipulator';
import SvgIcon from 'material-ui/SvgIcon';
import InfoIcon from 'material-ui-icons/InfoOutline';

// styles
import NotifiableInfoIconStyles from '../styles/NotifiableInfoIcon-Style';

const NotifiableInfoIcon = ({ badge, classes, theme }) => {
  if (badge) {
    const badgeColor = lighten(theme.palette.secondary.main, 0.5);
    return (
      <span className={classes.container}>
        <InfoIcon />
        <SvgIcon className={classes.badge}>
          <circle cx={12} cy={12} r={5} fill={badgeColor} />
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
