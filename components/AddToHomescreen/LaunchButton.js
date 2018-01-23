import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import DownloadIcon from 'material-ui-icons/CloudDownload';

// styles
import LaunchButtonStyles from '../../styles/AddToHomescreen/LaunchButton-Style';

const LaunchButton = ({ classes, onClick }) => {
  const { icon, text, ...buttonClasses } = classes;
  return (
    <Button raised color="accent" onClick={onClick} classes={buttonClasses}>
      <DownloadIcon className={icon} />
      <span className={text}>アプリをダウンロード</span>
    </Button>
  );
};
LaunchButton.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
};
export default withStyles(LaunchButtonStyles)(LaunchButton);
