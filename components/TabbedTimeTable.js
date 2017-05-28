import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import TabContent from './TabContent';
import GA from './GA';

class TabbedTimeTable extends Component {
  state = { index: this.props.index }

  handleChange = (value) => {
    this.setState({
      index: value,
    });
    GA.pageview(this.props.tabs[value]);
  }

  render() {
    return (
      <div>
        <Tabs
          tabItemContainerStyle={styles.tabItemContainer}
          inkBarStyle={styles.tabInkBar}
          onChange={this.handleChange}
          value={this.state.index}>
          {this.props.tabs.map(TabLabel)}
        </Tabs>
        <SwipeableViews
          resistance
          style={styles.swipeableViewsContainer}
          index={this.state.index}
          onChangeIndex={this.handleChange}>
          {this.props.tabs.map(TabContent)}
        </SwipeableViews>
      </div>
    );
  }
}

const TabLabel = ({ label, C }, index) => (
  <Tab key={label} label={makeTabLabel({ label, C })} value={index} />
);

export default TabbedTimeTable;

const makeTabLabel = ({ label, C, ...props }) => (
  <div>
    <span style={styles.icon}>
      <C.type {...C.props} style={styles.svg} {...props} />
    </span>
    {label}
  </div>
);

const styles = {
  tabItemContainer: {
    position: 'fixed',
    top: 0,
    width: '100%',
    maxWidth: 800,
  },
  tabInkBar: {
    height: 4,
    marginTop: -4,
    position: 'fixed',
    top: 48,
  },
  swipeableViewsContainer: {
    marginTop: 48,
  },
  icon: {
    display: 'inline-flex',
    alignSelf: 'center',
    position: 'relative',
    height: '1.4em',
    width: '1.4em',
    marginRight: '0.3em',
  },
  svg: {
    color: 'inherit',
    height: '1.4em',
    width: '1.4em',
    position: 'absolute',
    bottom: '-0.3em',
  },
};
