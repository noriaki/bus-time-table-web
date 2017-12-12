import React from 'react';
import { createMount } from 'material-ui/test-utils';

import DepartureInfo from '../../../components/GuideBoard/DepartureInfo';

describe('GuideBoard/DepartureInfo component', () => {
  let mount;

  beforeEach(() => { mount = createMount(); });

  it('should includes `departure name` and formatted `departure time`', () => {
    const departure = '新橋駅';
    const nextTime = 1000 * 60 * ((60 * 3) + 15);
    const wrapper = mount(
      <DepartureInfo departure={departure} nextTime={nextTime} />
    );
    expect(wrapper.text()).toBe(`${departure}12:15発`);
  });
});
