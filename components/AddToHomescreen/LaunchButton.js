import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import DownloadIcon from 'material-ui-icons/CloudDownload';

// styles
import LaunchButtonAnimateStyles from '../../styles/AddToHomescreen/LaunchButtonAnimate-Style';
import LaunchButtonMinimizeStyles from '../../styles/AddToHomescreen/LaunchButtonMinimize-Style';

const LaunchButton = ({ classes, onClick }) => {
  const { icon, text, ...buttonClasses } = classes;
  return (
    <Button raised color="secondary" onClick={onClick} classes={buttonClasses}>
      <DownloadIcon className={icon} />
      <span className={text}>アプリをダウンロード</span>
    </Button>
  );
};
LaunchButton.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
};

export const LaunchButtonAnimate = withStyles(
  LaunchButtonAnimateStyles
)(LaunchButton);
export const LaunchButtonMinimize = withStyles(
  LaunchButtonMinimizeStyles
)(LaunchButton);

export default {
  LaunchButtonAnimate,
  LaunchButtonMinimize,
};
