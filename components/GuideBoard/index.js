import React from 'react';
import PropTypes from 'prop-types';
import defaultsDeep from 'lodash.defaultsdeep';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';

import DepartureInfo from './DepartureInfo';
import CountDownClock from './CountDownClock';
import NaviButton from './NaviButton';

import GuideBoardStyle from '../../styles/GuideBoard';
import GuideBoardHorizontallyStyle from '../../styles/GuideBoard/horizontally';
import GuideBoardVerticallyStyle from '../../styles/GuideBoard/vertically';

const GuideBoard = ({
  departure,
  nextTime,
  remaining,
  onPrev,
  onNext,
  vertically,
  classes,
}) => {
  const noop = () => {};
  const disablePrev = onPrev === false;
  const disableNext = onNext === false;
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
  return (
    <article className={articleClasses}>
      <section className={sectionClasses}>
        <DepartureInfo departure={departure} nextTime={nextTime} />
        <CountDownClock remaining={remaining} />
      </section>
      <nav className={prevClasses}>
        <NaviButton
          to={`Lx${classSuffix}`}
          onClick={onPrev || noop}
          disable={disablePrev} />
      </nav>
      <nav className={nextClasses}>
        <NaviButton
          to={`Rx${classSuffix}`}
          onClick={onNext || noop}
          disable={disableNext} />
      </nav>
    </article>
  );
};
GuideBoard.propTypes = {
  departure: PropTypes.string.isRequired,
  nextTime: PropTypes.number.isRequired,
  remaining: PropTypes.number.isRequired,
  onPrev: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]).isRequired,
  onNext: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]).isRequired,
  vertically: PropTypes.bool,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
GuideBoard.defaultProps = {
  vertically: false,
};

const mergedStyles = defaultsDeep(
  GuideBoardVerticallyStyle,
  GuideBoardHorizontallyStyle,
  GuideBoardStyle
);

export default withStyles(mergedStyles)(GuideBoard);
