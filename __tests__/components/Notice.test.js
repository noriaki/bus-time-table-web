import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import Notice from '~/components/Notice';

describe('<Notice />', () => {
  let shallow;
  beforeEach(() => {
    shallow = createShallow();
  });

  it('should work', () => {
    const wrapper = shallow(<Notice />);
    expect(wrapper.find('NotificationsIcon')).toExist();
  });
});
