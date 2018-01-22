import React from 'react';
import PropTypes from 'prop-types';
import { parse } from 'url';
import { compose, withStateHandlers, lifecycle, setStatic } from 'recompose';
import Button from 'material-ui/Button';

import isStandaloneApp from '../libs/isStandaloneApp';

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

function componentDidMount() {
  const isStandalone = isStandaloneApp(parse(document.location.href, true));
  if (!isStandalone) { this.setState({ onDoubleClick: null }); }
}

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
  lifecycle({ componentDidMount }),
  withStateHandlers(initialState, stateUpdaters),
  setStatic('muiName', 'Button')
);
export default enhance(DoubleClickableButton);
