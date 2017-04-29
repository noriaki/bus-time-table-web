import React from 'react';
import {
  Table, TableBody, TableHeaderColumn, TableRow, TableRowColumn,
} from 'material-ui/Table';
import ActionInfo from 'material-ui/svg-icons/action/info-outline';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import { white, grey500 } from 'material-ui/styles/colors';
import { premiumBlack, silver } from '../themes/colors';

const TimeTable = ({ data }) => (
  <Table selectable={false} style={styles.timeTable}>
    <TableBody stripedRows displayRowCheckbox={false}>
      {data.map(RowIterator)}
    </TableBody>
  </Table>
);

const RowIterator = ({ hour, minutes, divider, note }) => {
  if (divider != null) { return buildDivider(); }
  if (note != null) { return buildNote(note); }
  return buildRow({ hour, minutes });
};
const buildRow = ({ hour, minutes }) => (
  <TableRow key={hour} style={styles.row}>
    <TableHeaderColumn style={{ ...styles.column, ...styles.hourColumn }}>
      {format(hour)}
    </TableHeaderColumn>
    {fill(minutes).map(makeMinutesRowIterator(hour))}
  </TableRow>
);
const buildDivider = () => (
  <TableRow key="divider">
    <TableRowColumn colSpan="13" style={styles.dividerColumn}>
      <NavigationMoreVert color={silver} />
    </TableRowColumn>
  </TableRow>
);
const buildNote = note => (
  <TableRow displayBorder={false} key={`note-${note}`} style={styles.row}>
    <TableRowColumn colSpan="13" style={styles.noteColumn}>
      <span style={styles.icon}>
        <ActionInfo color={styles.noteColumn.color} style={styles.svg} />
      </span>
      {note}
    </TableRowColumn>
  </TableRow>
);
const makeMinutesRowIterator = hour => (minute, i) => (
  <TableRowColumn key={`${hour}-${i}`} style={styles.column}>
    {format(minute)}
  </TableRowColumn>
);

const format = num => (num != null ? (`0${num}`).slice(-2) : '');
const fill = minutes => [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(
  num => (minutes.includes(num) ? num : null)
);

const styles = {
  timeTable: {
    borderTop: `2px solid ${premiumBlack}`,
    borderBottom: `2px solid ${premiumBlack}`,
  },
  row: {
    height: 24,
  },
  dividerColumn: {
    backgroundColor: white,
    textAlign: 'center',
  },
  noteColumn: {
    backgroundColor: white,
    height: 13,
    paddingLeft: '0.5em',
    fontSize: 11,
    color: grey500,
  },
  hourColumn: {
    color: silver,
    backgroundColor: premiumBlack,
  },
  column: {
    textAlign: 'center',
    height: 18,
    paddingLeft: 0,
    paddingRight: 0,
  },
  icon: {
    display: 'inline-flex',
    alignSelf: 'center',
    position: 'relative',
    height: '1.4em',
    width: '1.4em',
    marginRight: '0.3em',
  },
  svg: {
    color: 'inherit',
    height: '1.4em',
    width: '1.4em',
    position: 'absolute',
    bottom: '-0.3em',
  },
};

export default TimeTable;
