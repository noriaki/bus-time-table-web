import { Component } from 'react';

export default class extends Component {
  static get = key => ga.getAll()[0].get(key)
  static gets(...keys) {
    return keys.reduce((ret, key) => {
      // eslint-disable-next-line no-param-reassign
      ret[key] = this.get(key);
      return ret;
    }, {});
  }

  static set = (...props) => {
    ga('set', ...props);
  }

  static pageview({ page, title = document.title }) {
    this.set({ page, title });
    ga('send', 'pageview');
  }

  static social = ({
    network,
    action,
    url,
    callback = () => {},
  }) => {
    ga('send', {
      hitType: 'social',
      transport: 'beacon',
      socialNetwork: network,
      socialAction: action,
      socialTarget: url,
      hitCallback: callback,
    });
  }

  static event = ({
    category,
    action,
    label,
    callback = () => {},
  }) => {
    ga('send', {
      hitType: 'event',
      transport: 'beacon',
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
      hitCallback: callback,
    });
  }

  static share(network, callback = () => {}) {
    return () => {
      const url = 'https://deux-tours-bus.com';
      Promise.all([new Promise(resolve => this.social({
        network, action: 'send', url, callback: resolve,
      })), new Promise(resolve => this.event({
        category: 'Share', action: 'send', label: network, callback: resolve,
      }))]).then(callback);
    };
  }

  componentDidMount() {
    /* eslint-disable */
    (function(i,s,o,h,g,r,a,m){
      i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)
      },i[r].l=1*new Date();
      a=s.createElement(o),m=s.getElementsByTagName(h)[0];
      a.async=1;a.src=g;m.appendChild(a)
    })(
      window,document,
      'script','head','https://www.google-analytics.com/analytics.js','ga'
    );
    /* eslint-enable */
    ga('create', this.props.id, this.props.options || 'auto');
    ga('set', 'transport', 'beacon');
    if (detectStandalone({ navigator, location: document.location })) {
      ga('set', 'dataSource', 'web/standalone');
    }
    this.constructor.pageview(this.props.initialPageView);
  }

  render() { return null; }
}

const detectStandalone = ({ navigator, location }) => (
  navigator.standalone != null ||
    (/display=standalone/).test(location.search || '')
);
