import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import NoSSR from 'react-no-ssr';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'next/router';

// libs
import { scrollToHashOrTop } from '../libs/scroller';
import precache4NextJS from '../libs/precache4NextJS';

// components
import DocumentHeader from '../components/DocumentHeader';
import AppTitleBar from '../components/AppTitleBar';
import AppNavigation from '../components/AppNavigation';
import SnackbarOnBottomNavigation from '../components/SnackbarOnBottomNavigation';
import GA from '../components/GA';
import SW from '../components/SW';
import JsonLd from '../components/JsonLd';

// styles
import MainLayoutStyle from '../styles/MainLayout-Style';

// data(pages)
import pages, { paths } from '../constants/pages';
import dataJsonLd from '../data/jsonld.json';

class MainLayout extends PureComponent {
  static propTypes = {
    router: PropTypes.shape({
      prefetch: PropTypes.func,
      pathname: PropTypes.string,
    }).isRequired,
    children: PropTypes.node.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
  }
  state = {
    openSnackbar: false,
  }

  componentDidMount() {
    const { router } = this.props;
    // scrolling anchor in page
    const { scrollTarget } = router.query;
    const hash = document.location.hash.slice(1);
    scrollToHashOrTop(scrollTarget || hash);
  }

  analyticsValue = () => {
    const { router } = this.props;
    const page = pages[router.pathname];
    return { page: router.pathname, title: page.appbarTitle };
  }

  handleSwActivated = () => {
    // prefetching pages when production
    const { router } = this.props;
    paths.forEach(router.prefetch);
    precache4NextJS()
      .then((responses) => {
        if (responses.length > 0 && responses.every(res => res.ok)) {
          this.handleOpenSnackbar();
        }
      })
      .catch(err => console.log(err));
  }

  handleOpenSnackbar = () => this.setState({ openSnackbar: true })
  handleCloseSnackbar = () => this.setState({ openSnackbar: false })

  render() {
    const {
      router,
      children,
      classes,
    } = this.props;
    const page = pages[router.pathname];
    const pathsAndLabels = paths.map(
      path => ({ path, label: pages[path].label })
    );

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
        <SnackbarOnBottomNavigation
          text="オフラインで利用できるようになりました"
          open={this.state.openSnackbar}
          onClose={this.handleCloseSnackbar} />
        <NoSSR>
          <SW onActivated={this.handleSwActivated} />
        </NoSSR>
        <NoSSR>
          <GA id="UA-97608334-1" initialPageView={this.analyticsValue()} />
        </NoSSR>
        <JsonLd data={dataJsonLd} />
      </div>
    );
  }
}
const enhance = compose(withRouter, withStyles(MainLayoutStyle));
export default enhance(MainLayout);
