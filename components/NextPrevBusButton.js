import React from 'react';
import { styled } from 'react-free-style';
import FlatButton from 'material-ui/FlatButton';
import RightIcon from 'material-ui/svg-icons/navigation/chevron-right';
import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';

import NextPrevBusButtonStyles, {
  button as buttonStyle,
} from '../styles/NextPrevBusButton-Style';

export const NextPrevBusButtonComponent = (
  { styles, active, left, right, onTouchTap, ...props }
) => {
  let naviText;
  let iconComponent;
  let disabled = true;
  if (isActiveLeft({ active, left, right })) {
    naviText = '前発';
    iconComponent = <LeftIcon {...props} />;
    disabled = false;
  } else if (isActiveRight({ active, left, right })) {
    naviText = '次発';
    iconComponent = <RightIcon {...props} />;
    disabled = false;
  }
  return (
    <FlatButton style={buttonStyle} disabled={disabled} onTouchTap={onTouchTap}>
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
