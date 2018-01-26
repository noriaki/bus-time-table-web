import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';

// libs
import getMobileEnv, {
  propTypes as mobilePropTypes,
} from '../../libs/getMobileEnv';
import { isMinimizeAppBanner, updateLastShownAt } from '../../libs/db';

// components
import { LaunchButtonAnimate, LaunchButtonMinimize } from './LaunchButton';
import Contents from './Contents';
import GA from '../GA';

// styles
import AddToHomescreenStyles from '../../styles/AddToHomescreen/index-Style';

class AddToHomescreen extends PureComponent {
  static propTypes = {
    mobile: PropTypes.shape(mobilePropTypes).isRequired,
  }

  constructor(props, ...args) {
    super(props, ...args);
    const { standalone } = props.mobile;
    this.state = {
      hidden: standalone === null ? true : standalone,
      minimize: false,
      open: false,
      previousPage: null,
    };
  }

  componentDidMount() {
    const { mobile } = this.props;

    // for launching app-getting dialog
    const nextState = {};

    // show or hide button
    if (mobile.standalone === null) {
      nextState.hidden = getMobileEnv().standalone;
    }

    // minimize or animate button
    (async () => {
      const isMinimize = await isMinimizeAppBanner();
      nextState.minimize = isMinimize;
      if (!isMinimize) { await updateLastShownAt(); }
      this.setState(nextState);
    })();
  }

  handleOpen = () => {
    const previousPage = GA.gets('page', 'title');
    GA.pageview({
      title: 'アプリをホーム画面へ追加する方法',
      page: '/screens/get-app',
    });
    this.setState({
      open: true,
      previousPage,
    });
  };

  handleClose = () => {
    GA.pageview(this.state.previousPage);
    this.setState({
      open: false,
      previousPage: null,
    });
  };

  render() {
    const { classes } = this.props;
    const { os } = this.props.mobile;
    const { hidden, minimize, open } = this.state;
    if (hidden) { return null; }
    const LaunchButton = minimize ? LaunchButtonMinimize : LaunchButtonAnimate;
    return (
      <Fragment>
        <LaunchButton onClick={this.handleOpen} />
        <Dialog
          open={open}
          onRequestClose={this.handleClose}
          aria-labelledby="getapp-screen-title">
          <DialogTitle
            id="getapp-screen-title"
            classes={{ root: classes.dialogTitle }}>
            アプリをホーム画面に追加
          </DialogTitle>
          <DialogContent classes={{ root: classes.dialogContent }}>
            <Contents os={os} />
          </DialogContent>
          <DialogActions classes={{ root: classes.dialogActions }}>
            <Button onClick={this.handleClose} color="accent">閉じる</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
export default withStyles(AddToHomescreenStyles)(AddToHomescreen);
