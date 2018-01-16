import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import NoSSR from 'react-no-ssr';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'next/router';

// libs
import getMobileEnv, {
  propTypes as mobilePropTypes,
} from '../libs/getMobileEnv';

// components
import DocumentHeader from '../components/DocumentHeader';
import AppTitleBar from '../components/AppTitleBar';
import AppNavigation from '../components/AppNavigation';
import GA from '../components/GA';
import SW from '../components/SW';

// styles
import MainLayoutStyle from '../styles/MainLayout-Style';

// data(pages)
import pages, { paths } from '../constants/pages';

class MainLayout extends PureComponent {
  static propTypes = {
    router: PropTypes.shape({
      prefetch: PropTypes.func,
      pathname: PropTypes.string,
    }).isRequired,
    children: PropTypes.node.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    ...mobilePropTypes,
  }

  constructor(props, ...args) {
    super(props, ...args);
    const { standalone } = props.mobile;
    this.state = {
      showAppGetting: standalone === undefined ? false : !standalone,
    };
  }

  componentDidMount() {
    const { router, mobile } = this.props;
    // show/hide navi to app-getting page
    if (mobile.standalone === undefined) {
      this.setState({ showAppGetting: !getMobileEnv().standalone });
    }
    // prefetching pages when production
    const otherPaths = paths.filter(path => path !== router.pathname);
    otherPaths.forEach((path) => {
      console.log(`prefetching... '${path}'`);
      router.prefetch(path);
    });
  }

  analyticsValue = () => {
    const { router } = this.props;
    const page = pages[router.pathname];
    return { page: router.pathname, title: page.appbarTitle };
  }

  render() {
    const {
      router,
      children,
      classes,
    } = this.props;
    const { showAppGetting } = this.state;
    const page = pages[router.pathname];
    const pathsAndLabels = paths.filter((path) => {
      if (path === '/getapp') { return showAppGetting; }
      return true;
    }).map(path => ({ path, label: pages[path].label }));

    return (
      <div className={classes.pageContainer}>
        <DocumentHeader
          title={page.title}
          description={page.description} />
        <AppTitleBar title={page.appbarTitle} />
        <main className={classes.main}>
          { children }
        </main>
        <AppNavigation pathsAndLabels={pathsAndLabels} />
        <NoSSR>
          <GA id="UA-97608334-1" initialPageView={this.analyticsValue()} />
        </NoSSR>
        <NoSSR><SW /></NoSSR>
      </div>
    );
  }
}
const enhance = compose(withRouter, withStyles(MainLayoutStyle));
export default enhance(MainLayout);
