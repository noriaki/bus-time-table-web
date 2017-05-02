import React, { Component } from 'react';

class LineItButton extends Component {
  componentDidMount() { LineIt.loadButton(); }
  render() {
    return (
      <div
        className="line-it-button"
        data-lang="ja"
        data-type="share-a"
        data-url="https://deux-tours-bus.com"
        style={styles.button} />
    );
  }
}

export default LineItButton;

const styles = {
  button: {
    display: 'none',
  },
};
