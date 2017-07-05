import cssPropTypes from 'react-style-proptype/src/css-properties';

// styles
import RemainingClockStyles from '../../styles/RemainingClock-Style';

const componentStyles = {
  RemainingClockStyles,
};

Object.keys(componentStyles).forEach((componentStyle) => {
  describe(`"${componentStyle}" should has valid css properties`, () => {
    const styles = componentStyles[componentStyle];
    Object.keys(styles).forEach((className) => {
      it(className, () => {
        Object.keys(styles[className]).forEach((propertyName) => {
          expect(cssPropTypes).toContain(propertyName);
        });
      });
    });
  });
});
