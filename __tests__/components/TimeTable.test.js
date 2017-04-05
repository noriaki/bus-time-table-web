import React from 'react';
import { mount, shallow } from 'enzyme';
// import { mountToJson } from 'enzyme-to-json';

// components
import TimeTable from '../../components/TimeTable';

const data = [
  { hour: 6, minutes: [0, 30, 50] },
  { hour: 7, minutes: [5, 20, 30, 45] },
];

describe('TimeTable Component', () => {
  describe('Snapshot test', () => {
    let subject;
    beforeEach(() => {
      subject = mount(<TimeTable data={data} />);
    });

    it('should render successful', () => {
      expect(subject).toBeTruthy();
    });

    /* it('should match snapshot', () => {
      expect(mountToJson(subject)).toMatchSnapshot();
    }); */
  });

  describe('test with shallow()', () => {
    let subject;
    beforeEach(() => {
      subject = shallow(<TimeTable data={data} />);
    });

    it('should contains 2 rows (<TableRow>)', () => {
      expect(subject.find('TableRow').length).toBe(2);
    });

    it('should contains 2 header cells (<TableHeaderCell>)', () => {
      expect(subject.find('TableHeaderCell').length).toBe(2);
    });
  });
});
