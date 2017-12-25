import React, { PureComponent } from 'react';
import NoSSR from 'react-no-ssr';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'next/router';

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
  componentDidMount() {
    const { router } = this.props;
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
    const page = pages[router.pathname];
    const pathsAndLabels = paths.map(path => ({
      path, label: pages[path].label,
    }));
    const handleNavigationChange = (event, value) => {
      event.preventDefault();
      if (value !== router.pathname) {
        router.push(value);
      }
    };

    return (
      <div className={classes.pageContainer}>
        <DocumentHeader
          title={page.title}
          description={page.description} />
        <AppTitleBar title={page.appbarTitle} />
        <main className={classes.main}>
          { children }
        </main>
        <AppNavigation
          pathsAndLabels={pathsAndLabels}
          currentPathname={router.pathname}
          onNavigationChange={handleNavigationChange} />
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
