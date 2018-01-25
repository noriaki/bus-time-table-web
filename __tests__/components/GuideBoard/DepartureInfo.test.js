import React from 'react';
import { createMount } from 'material-ui/test-utils';

import DepartureInfo from '../../../components/GuideBoard/DepartureInfo';

describe('GuideBoard/DepartureInfo component', () => {
  let mount;

  beforeEach(() => { mount = createMount(); });

  afterEach(() => { mount.cleanUp(); });

  it('should includes `departure name` and formatted `departure time`', () => {
    const id = 'Shimbashi';
    const departure = '新橋駅';
    const nextTime = 1000 * 60 * ((60 * 3) + 15);
    const wrapper = mount(
      <DepartureInfo id={id} departure={departure} nextTime={nextTime} />
    );
    expect(wrapper.text()).toBe(`${departure}12:15発`);
  });
});
