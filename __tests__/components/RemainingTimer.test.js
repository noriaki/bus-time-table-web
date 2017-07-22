import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import moment from 'moment';

import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import RemainingTimer from '../../components/RemainingTimer';
import { homeToStation as data, activeDays } from '../../data/timetable.json';

describe('<RemainingTimer />', () => {
  const shallowOpts = {
    lifecycleExperimental: true,
    context: { muiTheme: getMuiTheme() },
    childContextTypes: { muiTheme: PropTypes.object.isRequired },
  };
  const props = {
    activeDays,
    data,
    dest: 'test',
  };

  let clock;
  let startTime;
  let wrapper;
  let timerState;
  let clockProps;
  let tableProps;
  beforeEach(() => { startTime = moment('2017-06-15'); });

  afterEach(() => {
    timerState = undefined;
    clockProps = undefined;
    tableProps = undefined;
    clock.restore();
    if (wrapper !== undefined) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  it('should over from in operation to after the last bus', () => {
    startTime.day('saturday').minutes(59).seconds(59);
    clock = sinon.useFakeTimers(startTime.valueOf());
    wrapper = shallow(<RemainingTimer {...props} />, shallowOpts);

    timerState = wrapper.state();
    clockProps = wrapper.find('Styled<RemainingClock>').props();
    tableProps = wrapper.find('TimeTable').props();
    expect(clockProps.inactive).toBe(false);
    expect(clockProps.ended).toBe(false);
    expect(
      moment(tableProps.targetTime).isSame(timerState.nextTime)
    ).toBe(true);

    clock.tick(moment.duration(2, 'seconds').asMilliseconds());

    timerState = wrapper.state();
    clockProps = wrapper.find('Styled<RemainingClock>').props();
    tableProps = wrapper.find('TimeTable').props();
    expect(clockProps.inactive).toBe(false);
    expect(clockProps.ended).toBe(true);
    expect(tableProps.targetTime).toBeUndefined();
    expect(timerState.nextTime).toBeUndefined();
  });

  it('should has ended unchanged from after the last bus to in holiday', () => {
    startTime.day('saturday').hours(3).minutes(59).seconds(59);
    clock = sinon.useFakeTimers(startTime.valueOf());
    wrapper = shallow(<RemainingTimer {...props} />, shallowOpts);

    timerState = wrapper.state();
    clockProps = wrapper.find('Styled<RemainingClock>').props();
    tableProps = wrapper.find('TimeTable').props();
    expect(clockProps.inactive).toBe(false);
    expect(clockProps.ended).toBe(true);
    expect(tableProps.targetTime).toBeUndefined();
    expect(timerState.nextTime).toBeUndefined();

    clock.tick(moment.duration(2, 'seconds').asMilliseconds());

    timerState = wrapper.state();
    clockProps = wrapper.find('Styled<RemainingClock>').props();
    tableProps = wrapper.find('TimeTable').props();
    expect(clockProps.inactive).toBe(true);
    expect(clockProps.ended).toBe(false);
    expect(tableProps.targetTime).toBeUndefined();
    expect(timerState.nextTime).not.toBeUndefined();
  });

  it('should has ended unchanged in holiday', () => {
    startTime.day('sunday').minutes(59).seconds(59);
    clock = sinon.useFakeTimers(startTime.valueOf());
    wrapper = shallow(<RemainingTimer {...props} />, shallowOpts);

    timerState = wrapper.state();
    clockProps = wrapper.find('Styled<RemainingClock>').props();
    tableProps = wrapper.find('TimeTable').props();
    expect(clockProps.inactive).toBe(true);
    expect(clockProps.ended).toBe(false);
    expect(tableProps.targetTime).toBeUndefined();
    expect(timerState.nextTime).not.toBeUndefined();

    clock.tick(moment.duration(2, 'seconds').asMilliseconds());

    timerState = wrapper.state();
    clockProps = wrapper.find('Styled<RemainingClock>').props();
    tableProps = wrapper.find('TimeTable').props();
    expect(clockProps.inactive).toBe(true);
    expect(clockProps.ended).toBe(true);
    expect(tableProps.targetTime).toBeUndefined();
    expect(timerState.nextTime).toBeUndefined();
  });

  it('should work start from in holiday to in operation', () => {
    startTime.day('monday').hours(3).minutes(59).seconds(59);
    clock = sinon.useFakeTimers(startTime.valueOf());
    wrapper = shallow(<RemainingTimer {...props} />, shallowOpts);

    timerState = wrapper.state();
    clockProps = wrapper.find('Styled<RemainingClock>').props();
    tableProps = wrapper.find('TimeTable').props();
    expect(clockProps.inactive).toBe(true);
    expect(clockProps.ended).toBe(true);
    expect(tableProps.targetTime).toBeUndefined();
    expect(timerState.nextTime).toBeUndefined();

    clock.tick(moment.duration(2, 'seconds').asMilliseconds());

    timerState = wrapper.state();
    clockProps = wrapper.find('Styled<RemainingClock>').props();
    tableProps = wrapper.find('TimeTable').props();
    expect(clockProps.inactive).toBe(false);
    expect(clockProps.ended).toBe(false);
    expect(
      moment(tableProps.targetTime).isSame(timerState.nextTime)
    ).toBe(true);
  });
});
