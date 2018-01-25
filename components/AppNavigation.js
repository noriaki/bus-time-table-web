import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { animateScroll } from 'react-scroll';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'next/router';
import BottomNavigation, {
  BottomNavigationButton,
} from 'material-ui/BottomNavigation';
import TimerIcon from 'material-ui-icons/Schedule';
import TimeTableIcon from 'material-ui-icons/ViewList';

// libs
import { firstOrCreateReadStateOfUser, updateReadState } from '../libs/db';

// data
import { version } from '../package.json';

// components
import NotifiableInfoIcon from './NotifiableInfoIcon';

// styles
import AppNavigationStyles from '../styles/AppNavigation-Style';

class AppNavigation extends PureComponent {
  static propTypes = {
    pathsAndLabels: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })
    ).isRequired,
    router: PropTypes.shape({
      push: PropTypes.func,
      pathname: PropTypes.string,
    }).isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
  }
  static icons = {
    '/': TimerIcon,
    '/timetable': TimeTableIcon,
    '/info': NotifiableInfoIcon,
  }
  state = { badge: false }

  componentDidMount() {
    const { router } = this.props;
    firstOrCreateReadStateOfUser(version)
      .then(({ isUnreadNotification }) => {
        if (router.pathname === '/info' && isUnreadNotification) {
          updateReadState(version).then(() => {
            this.setState({ badge: false });
          });
        } else {
          this.setState({ badge: isUnreadNotification });
        }
      });
  }

  buildBottomNavigationButton = ({ path, label }) => (
    <BottomNavigationButton
      key={path}
      label={label}
      value={path}
      icon={this.renderIcon(path)} />
  )

  handleNavigationChange = (event, targetPath) => {
    event.preventDefault();
    const { router } = this.props;
    if (targetPath !== router.pathname) {
      router.push(targetPath);
    } else {
      animateScroll.scrollToTop({ duration: 400 });
    }
  }

  renderIcon = (path) => {
    const Icon = this.constructor.icons[path];
    if (path === '/info') {
      const { badge } = this.state;
      return <Icon badge={badge} />;
    }
    return <Icon />;
  }

  render() {
    const {
      pathsAndLabels,
      router,
      classes,
    } = this.props;
    return (
      <div className={classes.container}>
        <BottomNavigation
          value={router.pathname}
          showLabels
          onChange={this.handleNavigationChange}>
          { pathsAndLabels.map(this.buildBottomNavigationButton) }
        </BottomNavigation>
      </div>
    );
  }
}
const enhance = compose(withRouter, withStyles(AppNavigationStyles));
export default enhance(AppNavigation);
