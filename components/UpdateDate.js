import React from 'react';
import { grey500 } from 'material-ui/styles/colors';
import { momentFromVersion } from '../libs/timeTableDataHandler';

const UpdateDate = ({ date }) => (
  <small style={styles.updateDate}>
    更新日：{momentFromVersion(date).format('YYYY/MM/DD')}
  </small>
);

const styles = {
  updateDate: {
    color: grey500,
    margin: 5,
    display: 'block',
    textAlign: 'right',
  },
};

export default UpdateDate;
