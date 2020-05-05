import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
// import { renderHook, act } from '@testing-library/react-hooks';
import { createContainer } from 'unstated-next';
import moment from 'moment';

import GuideBoard from '~/components/GuideBoard';

import testTimetable from '../containers/fixtures/timetable.json';
import { createTimetableHook } from '~/containers/TimetableContainer';

const TestTimetableHook = createTimetableHook(testTimetable);

describe('<GuideBoard />', () => {
  // let hook;
  let Container;
  let mount;
  beforeEach(() => {
    // hook = renderHook(() => TestTimetableHook()).result;
    Container = createContainer(TestTimetableHook);
    mount = createMount({ dive: true });
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should includes with <ActiveBoard />', () => {
    const currentTime = moment('2017-06-15T08:00:01+09:00');
    const initialState = TestTimetableHook.buildState(currentTime)();
    const wrapper = mount(
      <Container.Provider initialState={initialState}>
        <GuideBoard clock={{ currentTime }} Timetable={Container} />
      </Container.Provider>
    );
    const subject = wrapper.find('ActiveBoard');
    expect(subject).toExist();
    expect(subject).toIncludeText('4分59秒');
  });
});
