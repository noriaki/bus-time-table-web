import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import TabContent from './TabContent';
import GA from './GA';

import { icon, svg } from '../styles/HorizontallyIcons-Style';
import { itemContainer, inkBar, swipeableViewsContainer } from '../styles/Tab-Style';

class TabbedTimeTable extends Component {
  state = { index: this.props.index }

  handleChange = (nextIndex) => {
    this.setState({
      index: nextIndex,
    });
    GA.pageview(this.props.tabs[nextIndex]);
  }

  render() {
    const { index } = this.state;
    const { tabs } = this.props;
    const inactiveIndex = Math.abs(index - 1);
    tabs[index].front = true;
    tabs[inactiveIndex].front = false;
    return (
      <div>
        <Tabs
          tabItemContainerStyle={itemContainer}
          inkBarStyle={inkBar}
          onChange={this.handleChange}
          value={index}>
          {tabs.map(TabLabel)}
        </Tabs>
        <SwipeableViews
          resistance
          style={swipeableViewsContainer}
          index={index}
          onChangeIndex={this.handleChange}>
          {tabs.map(TabContent)}
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
    <span style={icon}>
      <C.type {...C.props} style={svg} {...props} />
    </span>
    {label}
  </div>
);
