import React from 'react';
import { styled } from 'react-free-style';
import FlatButton from 'material-ui/FlatButton';
import RightIcon from 'material-ui/svg-icons/navigation/chevron-right';
import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';

import NextPrevBusButtonStyles, {
  buttonLeft, buttonRight,
} from '../styles/NextPrevBusButton-Style';

export const NextPrevBusButtonComponent = (
  { styles, active, left, right, ...props }
) => {
  let buttonStyle = {};
  let naviText;
  let iconComponent;
  if (isActiveLeft({ active, left, right })) {
    buttonStyle = buttonLeft;
    naviText = '前発';
    iconComponent = <LeftIcon {...props} />;
  } else if (isActiveRight({ active, left, right })) {
    buttonStyle = buttonRight;
    naviText = '次発';
    iconComponent = <RightIcon {...props} />;
  }
  return (
    <FlatButton style={buttonStyle}>
      <div className={styles.container}>
        <span className={styles.navigation}>
          {naviText}
        </span>
        {iconComponent}
      </div>
    </FlatButton>
  );
};

export default styled(NextPrevBusButtonStyles)(NextPrevBusButtonComponent);

const isActiveLeft = ({ active, left, right }) => active && !!left && !right;
const isActiveRight = ({ active, left, right }) => active && !!right && !left;
