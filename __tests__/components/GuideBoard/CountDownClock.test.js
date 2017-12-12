import React from 'react';
import { createMount } from 'material-ui/test-utils';

import CountDownClock from '../../../components/GuideBoard/CountDownClock';

describe('GuideBoard/CountDownClock component', () => {
  let mount;

  beforeEach(() => { mount = createMount(); });

  it('should includes `hours` in timer more than 1 hour remaining', () => {
    const remaining = 1000 * ((60 * ((60 * 3) + 15)) + 30);
    const wrapper = mount(
      <CountDownClock remaining={remaining} />
    );
    expect(wrapper.text()).toBe('03時間15分30秒');
  });

  it('should not includes `hours` in timer less than 1 hour remaining', () => {
    const remaining = 1000 * ((60 * 15) + 30);
    const wrapper = mount(
      <CountDownClock remaining={remaining} />
    );
    expect(wrapper.text()).toBe('15分30秒');
  });

  it('should includes `minutes` in timer less than 1 minute remaining', () => {
    const remaining = 1000 * 30;
    const wrapper = mount(
      <CountDownClock remaining={remaining} />
    );
    expect(wrapper.text()).toBe('00分30秒');
  });
});
