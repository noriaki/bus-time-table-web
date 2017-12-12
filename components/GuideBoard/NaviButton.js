import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import ArrowLeftIcon from 'material-ui-icons/KeyboardArrowLeft';
import ArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';

import NaviButtonStyle from '../../styles/GuideBoard/NaviButton-Style';

const NaviButton = ({
  to,
  onClick,
  disable,
  classes,
}) => {
  const { labelLeft, labelVertical, ...finalClasses } = classes;
  const naviDirection = ditectDirection(to);
  const params = {};
  if (naviDirection.left) {
    params.Icon = ArrowLeftIcon;
    params.text = '前発';
    finalClasses.label = classnames(finalClasses.label, labelLeft);
  } else if (naviDirection.right) {
    params.Icon = ArrowRightIcon;
    params.text = '次発';
  }
  if (naviDirection.horizontal) {
    finalClasses.label = classnames(finalClasses.label, labelVertical);
  }
  return (
    <Button
      classes={finalClasses}
      color="accent"
      disabled={disable}
      onClick={onClick}>
      <span>{params.text}</span>
      <params.Icon />
    </Button>
  );
};
NaviButton.propTypes = {
  to: PropTypes.oneOf(['LxV', 'LxH', 'RxV', 'RxH']).isRequired,
  onClick: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
};

export default withStyles(NaviButtonStyle)(NaviButton);

const ditectDirection = (s) => {
  const [LR, VH] = s.split('x');
  return {
    left: LR === 'L',
    right: LR === 'R',
    vertical: VH === 'V',
    horizontal: VH === 'H',
  };
};
