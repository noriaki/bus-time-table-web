import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Popover from 'material-ui/Popover';

// libs
import getMobileEnv, {
  propTypes as mobilePropTypes,
} from '../../libs/getMobileEnv';

// components
import LaunchButton from './LaunchButton';
import Contents from './Contents';
import GA from '../GA';

class AddToHomescreen extends PureComponent {
  static propTypes = {
    mobile: PropTypes.shape(mobilePropTypes).isRequired,
  }

  constructor(props, ...args) {
    super(props, ...args);
    const { standalone } = props.mobile;
    this.state = {
      hidden: standalone === undefined ? true : standalone,
      open: false,
      anchorEl: null,
      previousPage: null,
    };
  }

  componentDidMount() {
    const { mobile } = this.props;
    // show/hide button to launching app-getting popover
    if (mobile.standalone === undefined) {
      this.setState({ hidden: getMobileEnv().standalone });
    }
  }

  handleOpen = (event) => {
    const previousPage = GA.gets('page', 'title');
    GA.pageview({
      title: 'アプリをホーム画面へ追加する方法',
      page: '/screens/get-app',
    });
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
      previousPage,
    });
  };

  handleClose = () => {
    GA.pageview(this.state.previousPage);
    this.setState({
      open: false,
      anchorEl: null,
      previousPage: null,
    });
  };

  render() {
    const { os } = this.props.mobile;
    const { hidden, open, anchorEl } = this.state;
    if (hidden) { return null; }
    return (
      <Fragment>
        <LaunchButton onClick={this.handleOpen} />
        <Popover
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'center', horizontal: 'right' }}
          onRequestClose={this.handleClose}>
          <Contents os={os} />
        </Popover>
      </Fragment>
    );
  }
}
export default AddToHomescreen;
