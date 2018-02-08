const noop = () => {};
const registServiceWorker = ({
  onInstallingState = noop,
  onInstalledState = noop,
  onActivatingState = noop,
  onActivatedState = noop,
  onRedundantState = noop,
  onWaiting = noop,
  onActive = noop,
  onFailed = noop,
} = {}, dev = false) => {
  const g = typeof window !== 'undefined' ? window : global;
  if (!('navigator' in g)) { return; }
  if ('serviceWorker' in g.navigator) {
    g.navigator.serviceWorker.register('/sw.js')
      .then((reg) => {
        if (reg.installing != null) {
          if (dev) { console.log('Service worker installing'); }
          const newWorker = reg.installing;
          newWorker.addEventListener('statechange', () => {
            switch (newWorker.state) {
            case 'installing':
              if (dev) { console.log('Service worker state: installing'); }
              onInstallingState(newWorker);
              break;
            case 'installed':
              if (dev) { console.log('Service worker state: installed'); }
              onInstalledState(newWorker);
              break;
            case 'activating':
              if (dev) { console.log('Service worker state: activating'); }
              onActivatingState(newWorker);
              break;
            case 'activated':
              if (dev) { console.log('Service worker state: activated'); }
              onActivatedState(newWorker);
              break;
            case 'redundant':
              if (dev) { console.log('Service worker state: redundant'); }
              onRedundantState(newWorker);
              break;
            default:
              console.log(`Service worker UnKown state: ${newWorker.state}`);
              break;
            }
          });
        } else if (reg.waiting != null) {
          if (dev) { console.log('Service worker waiting'); }
          onWaiting(reg.waiting);
        } else if (reg.active != null) {
          if (dev) { console.log('Service worker active'); }
          onActive(reg.active);
        } else {
          console.log('Service worker is UnKown');
        }
      })
      .catch((err) => {
        if (dev) { console.log('Registration failed with ', err.message); }
        onFailed(err);
      });
  }
};

export default registServiceWorker;
