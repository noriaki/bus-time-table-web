import cssPropTypes from 'react-style-proptype/src/css-properties';

// styles
import RemainingClockStyles from '../../styles/RemainingClock-Style';
import AddToHomescreenStyles from '../../styles/AddToHomescreen-Style';
import AddToHomescreenDetailStyles from '../../styles/AddToHomescreenDetail-Style';
import AppInformationMenuStyles from '../../styles/AppInformationMenu-Style';
import AppNavigationStyles from '../../styles/AppNavigation-Style';
import ChangeLogInfoStyles from '../../styles/ChangeLogInfo-Style';
import ChangeLogInfoContentStyles from '../../styles/ChangeLogInfoContent-Style';
import FacebookSendButtonStyles from '../../styles/FacebookSendButton-Style';
import LineItButtonStyles from '../../styles/LineItButton-Style';
import HorizontallyIconsStyles from '../../styles/HorizontallyIcons-Style';

const componentStyles = {
  RemainingClockStyles,
  AddToHomescreenStyles,
  AddToHomescreenDetailStyles,
  AppInformationMenuStyles,
  AppNavigationStyles,
  ChangeLogInfoStyles,
  ChangeLogInfoContentStyles,
  FacebookSendButtonStyles,
  LineItButtonStyles,
  HorizontallyIconsStyles,
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
