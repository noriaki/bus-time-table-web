import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import TabContent from './TabContent';
import GA from './GA';

import { icon, svg } from '../styles/HorizontallyIcons-Style';
import { itemContainer, inkBar, swipeableViewsContainer } from '../styles/Tab-Style';

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
          tabItemContainerStyle={itemContainer}
          inkBarStyle={inkBar}
          onChange={this.handleChange}
          value={this.state.index}>
          {this.props.tabs.map(TabLabel)}
        </Tabs>
        <SwipeableViews
          resistance
          style={swipeableViewsContainer}
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
    <span style={icon}>
      <C.type {...C.props} style={svg} {...props} />
    </span>
    {label}
  </div>
);
