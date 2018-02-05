import { Component } from 'react';

import GA from './GA';

export default class extends Component {
  componentDidMount() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
          if (reg.installing) {
            console.log('Service worker installing');
          } else if (reg.waiting) {
            console.log('Service worker installed');
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
