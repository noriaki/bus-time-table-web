import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import registServiceWorker from '../libs/registServiceWorker';

import GA from './GA';

export default class extends PureComponent {
  static propTypes = {
    onActivated: PropTypes.func,
  }
  static defaultProps = {
    onActivated: () => {},
  }

  componentDidMount() {
    registServiceWorker({ onActivatedState: this.props.onActivated });
    window.addEventListener('beforeinstallprompt', (e) => {
      GA.event({
        category: 'Banner',
        action: 'show',
        label: 'add-to-homescreen',
      });
      e.userChoice.then(result => (
        result.outcome === 'dismissed' ?
          GA.event({
            category: 'Banner',
            action: 'dismiss',
            label: 'add-to-homescreen',
          }) : GA.event({
            category: 'Banner',
            action: 'install',
            label: 'add-to-homescreen',
          })
      ));
    });
  }

  render() { return null; }
}
