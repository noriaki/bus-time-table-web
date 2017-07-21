import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import { RemainingClock } from '../../components/RemainingClock';

describe('<RemainingClock />', () => {
  const props = {
    dest: 'test',
    remaining: 1000, // after 00:01
    time: moment.utc(0),
    styles: {},
  };

  it('should work with in operation and less than a hour contexts', () => {
    const isEnded = false;
    const isInactive = false;
    const wrapper = shallow(
      <RemainingClock {...props} ended={isEnded} inactive={isInactive} />
    );
    expect(wrapper.text()).toMatch(/00:00発/);
    expect(wrapper.text()).toMatch(/test行/);
    expect(wrapper.text()).toMatch(/00分01秒後/);
    expect(wrapper.text()).not.toMatch(/時間/);
  });

  it('should work with in operation and more than a hour contexts', () => {
    const isEnded = false;
    const isInactive = false;
    const remaining = ((60 * 60) + 1) * 1000; // after 01:00:01
    const wrapper = shallow(
      <RemainingClock
        {...props}
        remaining={remaining}
        ended={isEnded}
        inactive={isInactive} />
    );
    expect(wrapper.text()).toMatch(/00:00発/);
    expect(wrapper.text()).toMatch(/test行/);
    expect(wrapper.text()).toMatch(/01時間00分01秒後/);
  });

  it('should not to work with after the last bus contexts', () => {
    const isEnded = true;
    const isInactive = false;
    const wrapper = shallow(
      <RemainingClock {...props} ended={isEnded} inactive={isInactive} />
    );
    expect(wrapper.text()).toMatch(/test行/);
    expect(wrapper.text()).toMatch(/全て終了しました/);
  });

  it('should not to work with in holiday contexts', () => {
    const isEnded = false;
    const isInactive = true;
    const wrapper = shallow(
      <RemainingClock {...props} ended={isEnded} inactive={isInactive} />
    );
    expect(wrapper.text()).toMatch(/運行はありません/);
  });
});
