import React from 'react';
import {
  Table, TableBody, TableHeaderColumn, TableRow, TableRowColumn,
} from 'material-ui/Table';
import ActionInfo from 'material-ui/svg-icons/action/info-outline';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import { white, grey500 } from 'material-ui/styles/colors';
import { blueSky, premiumBlack, silver } from '../themes/colors';
import { icon, svg } from '../styles/HorizontallyIcons-Style';
import {
  timeTable,
  row,
  dividerColumn,
  baseColumn,
  noteColumn,
  hourColumn,
  targetColumn,
} from '../styles/TimeTable-Style';

const TimeTable = ({ data, targetTime }) => (
  <Table selectable={false} style={timeTable}>
    <TableBody stripedRows displayRowCheckbox={false}>
      {data.map(RowIterator(targetTime))}
    </TableBody>
  </Table>
);

export default TimeTable;

const RowIterator = targetTime => ({ hour, minutes, divider, note }) => {
  if (divider != null) { return buildDivider(); }
  if (note != null) { return buildNote(note); }
  return buildRow({ hour, minutes, targetTime });
};
const buildRow = ({ hour, minutes, targetTime }) => (
  <TableRow key={hour} style={row}>
    <TableHeaderColumn style={{ ...baseColumn, ...hourColumn }}>
      {format(hour)}
    </TableHeaderColumn>
    {fill(minutes).map(makeMinutesRowIterator(hour, targetTime))}
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
const makeMinutesRowIterator = (hour, { hours, minutes }) => (minute) => {
  const columnStyle = (hour % 24 === hours && minute === minutes) ?
          { ...baseColumn, ...targetColumn } : baseColumn;
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
