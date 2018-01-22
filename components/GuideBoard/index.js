import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import defaultsDeep from 'lodash.defaultsdeep';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';

// components
import ClosingTimeBoard from './ClosingTimeBoard';
import InactiveDaysBoard from './InactiveDaysBoard';
import DepartureInfo from './DepartureInfo';
import CountDownClock from './CountDownClock';
import NaviButton from './NaviButton';
import GA from '../GA';

// styles
import GuideBoardStyle from '../../styles/GuideBoard';
import GuideBoardHorizontallyStyle from '../../styles/GuideBoard/horizontally';
import GuideBoardVerticallyStyle from '../../styles/GuideBoard/vertically';

const GuideBoard = ({
  departure,
  nextTime,
  remaining,
  onPrev,
  onNext,
  onFront,
  onLast,
  vertically,
  inactiveDay,
  afterTheLastBus,
  classes,
}) => {
  const noop = () => {};
  const disablePrev = onPrev === false;
  const disableNext = onNext === false;
  const gaEvent = {
    category: 'Timer',
    label: departure,
  };
  const onClickPrev = !disablePrev ? () => GA.event({
    ...gaEvent, action: 'Prev', callback: onPrev,
  }) : noop;
  const onClickNext = !disableNext ? () => GA.event({
    ...gaEvent, action: 'Next', callback: onNext,
  }) : noop;
  const onClickFront = onFront && (() => GA.event({
    ...gaEvent, action: 'Front', callback: onFront,
  }));
  const onClickLast = onLast && (() => GA.event({
    ...gaEvent, action: 'Last', callback: onLast,
  }));
  const classSuffix = vertically ? 'V' : 'H';
  const articleClasses = classnames(
    classes.container,
    classes[`container${classSuffix}`]
  );
  const sectionClasses = classnames(
    classes.guide,
    classes[`guide${classSuffix}`]
  );
  const prevClasses = classnames(
    classes.prev,
    classes[`prev${classSuffix}`]
  );
  const nextClasses = classnames(
    classes.next,
    classes[`next${classSuffix}`]
  );
  let boardContentComponents;
  if (inactiveDay) {
    boardContentComponents = <InactiveDaysBoard departure={departure} />;
  } else if (afterTheLastBus) {
    boardContentComponents = <ClosingTimeBoard departure={departure} />;
  } else {
    boardContentComponents = (
      <Fragment>
        <DepartureInfo departure={departure} nextTime={nextTime} />
        <CountDownClock remaining={remaining} />
      </Fragment>
    );
  }
  return (
    <article className={articleClasses}>
      <section className={sectionClasses}>
        { boardContentComponents }
      </section>
      <nav className={prevClasses}>
        <NaviButton
          to={`Lx${classSuffix}`}
          onClick={onClickPrev}
          onDoubleClick={onClickFront}
          disable={disablePrev} />
      </nav>
      <nav className={nextClasses}>
        <NaviButton
          to={`Rx${classSuffix}`}
          onClick={onClickNext}
          onDoubleClick={onClickLast}
          disable={disableNext} />
      </nav>
    </article>
  );
};
GuideBoard.propTypes = {
  departure: PropTypes.string.isRequired,
  nextTime: PropTypes.number,
  remaining: PropTypes.number,
  onPrev: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onNext: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onFront: PropTypes.func,
  onLast: PropTypes.func,
  vertically: PropTypes.bool,
  inactiveDay: PropTypes.bool,
  afterTheLastBus: PropTypes.bool,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
GuideBoard.defaultProps = {
  nextTime: undefined,
  remaining: undefined,
  onPrev: false,
  onNext: false,
  onFront: null,
  onLast: null,
  vertically: false,
  inactiveDay: false,
  afterTheLastBus: false,
};

const mergedStyles = defaultsDeep(
  GuideBoardVerticallyStyle,
  GuideBoardHorizontallyStyle,
  GuideBoardStyle
);

export default withStyles(mergedStyles)(GuideBoard);
