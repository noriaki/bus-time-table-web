import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import { withTheme } from 'material-ui/styles';

const SnackbarOnBottomNavigation = ({
  text,
  id,
  open,
  onClose,
  theme,
}) => {
  const { duration, getAutoHeightDuration } = theme.transitions;
  const { minHeight } = theme.mixins.toolbar;
  const snackbarHeight = 48;
  const snackbarDuration = getAutoHeightDuration(snackbarHeight);
  const andToolbarDuration = getAutoHeightDuration(snackbarHeight + minHeight);
  const ratio = andToolbarDuration / snackbarDuration;
  const snackbarTransitionDuration = {
    enter: duration.enteringScreen * ratio,
    exit: duration.leavingScreen * ratio,
  };

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      transitionDuration={snackbarTransitionDuration}
      autoHideDuration={2750}
      SnackbarContentProps={{ 'aria-describedby': id }}
      message={<span id={id}>{text}</span>} />
  );
};
SnackbarOnBottomNavigation.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  theme: PropTypes.shape({
    transitions: PropTypes.object,
    mixins: PropTypes.object,
  }).isRequired,
};
SnackbarOnBottomNavigation.defaultProps = {
  id: 'message-id',
};
SnackbarOnBottomNavigation.muiName = 'Snackbar';
export default withTheme()(SnackbarOnBottomNavigation);
