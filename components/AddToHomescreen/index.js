import React, { PureComponent, Fragment } from 'react';
import { findDOMNode } from 'react-dom'; // DEBUG
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

// components
import LaunchButton from './LaunchButton';
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
      open: false,
      previousPage: null,
    };
  }

  componentDidMount() {
    const { mobile } = this.props;
    // show/hide button to launching app-getting popover
    if (mobile.standalone === null) {
      this.setState({ hidden: getMobileEnv().standalone });
    }
    setTimeout(() => this.debugOpen(), 300); // DEBUG
  }

  /* DEBUG */
  debugOpen = () => {
    findDOMNode(this.button).click();
  }
  /* DEBUG */

  handleOpen = (event) => {
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
    const { hidden, open } = this.state;
    if (hidden) { return null; }
    const handleRef = (r) => { this.button = r; }; // DEBUG
    return (
      <Fragment>
        <LaunchButton
          ref={handleRef}
          onClick={this.handleOpen} />
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
