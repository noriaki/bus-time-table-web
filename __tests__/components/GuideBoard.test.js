import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
// import { renderHook, act } from '@testing-library/react-hooks';
import { createContainer } from 'unstated-next';

import dayjs, { SUN } from '~/libs/dayjs';
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
    const currentTime = dayjs('2017-06-15T08:00:01+09:00');
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

  describe('when the out of service', () => {
    it('should includes with <InactiveBoard />', () => {
      const currentTime = dayjs('2017-06-16T02:00:00+09:00');
      const initialState = TestTimetableHook.buildState(currentTime)();
      const wrapper = mount(
        <Container.Provider initialState={initialState}>
          <GuideBoard clock={{ currentTime }} Timetable={Container} />
        </Container.Provider>
      );
      const subject = wrapper.find('InactiveBoard');
      expect(subject).toExist();
      expect(subject).toHaveProp({
        title: '本日のバスは終了しました',
        subtitle: '(明日以降は時刻表を参照)',
      });
    });
  });

  describe('when the closed day (weekend, holiday)', () => {
    it('should includes with <InactiveBoard />', () => {
      const currentTime = dayjs('2017-06-15').day(SUN).hour(8);
      const initialState = TestTimetableHook.buildState(currentTime)();
      const wrapper = mount(
        <Container.Provider initialState={initialState}>
          <GuideBoard clock={{ currentTime }} Timetable={Container} />
        </Container.Provider>
      );
      const subject = wrapper.find('InactiveBoard');
      expect(subject).toExist();
      expect(subject).toHaveProp({
        title: '本日バス運行はありません',
        subtitle: '(運行は土日祝を除く平日のみ)',
      });
    });

    it('should closed day even if the out of service hours', () => {
      const currentTime = dayjs('2017-06-15').day(SUN).hour(2);
      const initialState = TestTimetableHook.buildState(currentTime)();
      const wrapper = mount(
        <Container.Provider initialState={initialState}>
          <GuideBoard clock={{ currentTime }} Timetable={Container} />
        </Container.Provider>
      );
      const subject = wrapper.find('InactiveBoard');
      expect(subject).toExist();
      expect(subject).toHaveProp({
        title: '本日バス運行はありません',
        subtitle: '(運行は土日祝を除く平日のみ)',
      });
    });
  });

  describe('when the suspended day', () => {
    it('should includes with <InactiveBoard />', () => {
      const currentTime = dayjs('2020-04-08T08:00:01+09:00');
      const initialState = TestTimetableHook.buildState(currentTime)();
      const wrapper = mount(
        <Container.Provider initialState={initialState}>
          <GuideBoard clock={{ currentTime }} Timetable={Container} />
        </Container.Provider>
      );
      const subject = wrapper.find('InactiveBoard');
      expect(subject).toExist();
      expect(subject).toHaveProp({
        title: '本日バス運行はありません',
        subtitle: '(臨時運休中：詳細はお知らせ欄を参照)',
      });
    });

    it('should suspend even if the out of service hours or/and the closed day', () => {
      // next sunday, 2 am.
      const currentTime = dayjs('2020-04-08').day(7).hour(2);
      const initialState = TestTimetableHook.buildState(currentTime)();
      const wrapper = mount(
        <Container.Provider initialState={initialState}>
          <GuideBoard clock={{ currentTime }} Timetable={Container} />
        </Container.Provider>
      );
      const subject = wrapper.find('InactiveBoard');
      expect(subject).toExist();
      expect(subject).toHaveProp({
        title: '本日バス運行はありません',
        subtitle: '(臨時運休中：詳細はお知らせ欄を参照)',
      });
    });
  });
});
