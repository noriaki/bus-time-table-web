import React from 'react';
import PropTypes from 'prop-types';
import { compose, withStateHandlers, setStatic } from 'recompose';
import Button from 'material-ui/Button';

const initialState = {
  timer: null,
};
const stateUpdaters = {
  setTimer: () => timerId => ({ timer: timerId }),
  clearTimer: ({ timer }) => () => {
    clearTimeout(timer);
    return { timer: initialState.timer };
  },
};
const isWaitingForDoubleClick = timer => typeof timer === 'number';

const DoubleClickableButton = ({
  onClick,
  onDoubleClick,
  delay,
  timer,
  setTimer,
  clearTimer,
  children,
  ...props
}) => {
  const finalOnClick = (event) => {
    if (onDoubleClick) {
      if (isWaitingForDoubleClick(timer)) {
        clearTimer();
        onDoubleClick(event);
      } else {
        const { currentTarget } = event;
        event.persist();
        setTimer(setTimeout(() => {
          clearTimer();
          onClick({ ...event, currentTarget });
        }, delay));
      }
    } else {
      onClick(event);
    }
  };
  return <Button onClick={finalOnClick} {...props}>{ children }</Button>;
};
DoubleClickableButton.propTypes = {
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  delay: PropTypes.number,
  timer: PropTypes.number,
  setTimer: PropTypes.func.isRequired,
  clearTimer: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
DoubleClickableButton.defaultProps = {
  onClick: () => {},
  onDoubleClick: null,
  delay: 200,
  timer: initialState.timer,
};

const enhance = compose(
  withStateHandlers(initialState, stateUpdaters),
  setStatic('muiName', 'Button')
);
export default enhance(DoubleClickableButton);
