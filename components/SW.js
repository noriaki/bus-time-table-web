import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import GA from './GA';

export default class extends PureComponent {
  static propTypes = {
    onActivated: PropTypes.func,
  }
  static defaultProps = {
    onActivated: () => {},
  }

  componentDidMount() {
    if ('serviceWorker' in navigator) {
      const { onActivated } = this.props;
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
          if (reg.installing) {
            console.log('Service worker installing');
            const newWorker = reg.installing;
            console.log(newWorker, newWorker.state);
            newWorker.addEventListener('statechange', () => {
              console.log(`Service worer state: ${newWorker.state}`);
              if (newWorker.state === 'activated') {
                console.log('prefetch all pages');
                onActivated();
              }
            });
          } else if (reg.waiting) {
            console.log('Service worker waiting');
          } else if (reg.active) {
            console.log('Service worker active');
          }
        })
        .catch((error) => {
          console.log('Registration failed with ', error);
        });
    }
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
