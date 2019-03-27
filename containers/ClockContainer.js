import { Container } from 'unstated';

export default class ClockContainer extends Container {
  state = {
    now: Date.now(),
  };

  constructor() {
    super();
    this.start();
  }

  start() {
    this.interval = setInterval(() => {
      this.setState({ now: Date.now() });
    }, 500);
  }

  stop() {
    clearTimeout(this.interval);
  }
}
