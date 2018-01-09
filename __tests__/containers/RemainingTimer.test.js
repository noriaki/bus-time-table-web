import React from 'react';
import { createMount } from 'material-ui/test-utils';
import moment from 'moment';
import sinon from 'sinon';

import timer from 'react-timer-hoc';
import RemainingTimer from '../../containers/RemainingTimer';
import GuideBoard from '../../components/GuideBoard';

describe('<RemainingTimer />', () => {
  let mount;
  let startTime;
  let clock;
  let spy;

  beforeEach(() => {
    mount = createMount();
    startTime = moment('2017-11-01');
    spy = sinon.spy(RemainingTimer.prototype, 'setState');
  });

  afterEach(() => {
    clock.restore();
    mount.cleanUp();
    spy.restore();
  });

  describe('passing props of boundary value to <RemainingClock />', () => {
    it('should over from in operation to after the last bus', () => {
      startTime.set({ hours: 23, minutes: 29, seconds: 59 });
      clock = sinon.useFakeTimers(startTime.valueOf());
      const CurrentTimer = timer(1000)(RemainingTimer);
      const timetable = [{ hour: 23, minutes: [30] }];
      const wrapper = mount(
        <CurrentTimer timetable={timetable}>
          <GuideBoard departure="t" />
        </CurrentTimer>
      );
      expect(wrapper.find('GuideBoard').prop('afterTheLastBus')).toBe(false);
      clock.tick(moment.duration(2, 'seconds').asMilliseconds());
      wrapper.update();
      expect(wrapper.find('GuideBoard').prop('afterTheLastBus')).toBe(true);
    });

    it('should work start from in out of service to in operation', () => {
      startTime.set({ hours: 3, minutes: 59, seconds: 59 });
      clock = sinon.useFakeTimers(startTime.valueOf());
      const CurrentTimer = timer(1000)(RemainingTimer);
      const timetable = [{ hour: 6, minutes: [0] }];
      const wrapper = mount(
        <CurrentTimer timetable={timetable}>
          <GuideBoard departure="t" />
        </CurrentTimer>
      );
      expect(wrapper.find('GuideBoard').prop('afterTheLastBus')).toBe(true);
      clock.tick(moment.duration(2, 'seconds').asMilliseconds());
      wrapper.update();
      expect(wrapper.find('GuideBoard').prop('afterTheLastBus')).toBe(false);
    });
  });
});
