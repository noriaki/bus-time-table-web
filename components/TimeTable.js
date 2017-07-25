import React from 'react';
import {
  Table, TableBody, TableHeaderColumn, TableRow, TableRowColumn,
} from 'material-ui/Table';
import ActionInfo from 'material-ui/svg-icons/action/info-outline';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import { silver } from '../themes/colors';
import { icon, svg } from '../styles/HorizontallyIcons-Style';
import {
  timeTable,
  row,
  dividerColumn,
  baseColumn,
  noteColumn,
  hourColumn,
  targetColumn,
  nextTargetColumn,
} from '../styles/TimeTable-Style';

const TimeTable = ({ data, targetTime = {}, nextTime = {} }) => (
  <Table selectable={false} style={timeTable}>
    <TableBody stripedRows displayRowCheckbox={false}>
      {data.map(RowIterator({ targetTime, nextTime }))}
    </TableBody>
  </Table>
);

export default TimeTable;

const RowIterator = time => ({ hour, minutes, divider, note }) => {
  if (divider != null) { return buildDivider(); }
  if (note != null) { return buildNote(note); }
  return buildRow({ hour, minutes, ...time });
};
const buildRow = ({ hour, minutes, ...time }) => (
  <TableRow key={hour} style={row}>
    <TableHeaderColumn style={{ ...baseColumn, ...hourColumn }}>
      {format(hour)}
    </TableHeaderColumn>
    {fill(minutes).map(makeMinutesRowIterator(hour, time))}
  </TableRow>
);
const buildDivider = () => (
  <TableRow key="divider">
    <TableRowColumn colSpan="13" style={dividerColumn}>
      <NavigationMoreVert color={silver} />
    </TableRowColumn>
  </TableRow>
);
const buildNote = note => (
  <TableRow displayBorder={false} key={`note-${note}`} style={row}>
    <TableRowColumn colSpan="13" style={noteColumn}>
      <span style={{ ...icon, marginRight: '0.3em' }}>
        <ActionInfo color={noteColumn.color} style={svg} />
      </span>
      {note}
    </TableRowColumn>
  </TableRow>
);
const makeMinutesRowIterator = (hour, { nextTime, targetTime }) => (minute) => {
  const h = hour % 24;
  let columnStyle = baseColumn;
  if (h === targetTime.hours && minute === targetTime.minutes) {
    columnStyle = targetColumn;
  } else if (h === nextTime.hours && minute === nextTime.minutes) {
    columnStyle = nextTargetColumn;
  }
  return (
    <TableRowColumn key={`${hour}-${minute}`} style={columnStyle}>
      {format(minute)}
    </TableRowColumn>
  );
};

const format = num => (num != null ? (`0${num}`).slice(-2) : '');
const fill = minutes => [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(
  num => (minutes.includes(num) ? num : null)
);
