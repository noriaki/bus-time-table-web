import { Component } from 'react';

export default class extends Component {
  componentDidMount() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  }

  render() { return null; }
}
