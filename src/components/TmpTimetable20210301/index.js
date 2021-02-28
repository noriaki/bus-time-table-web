import React from 'react';

// material-ui
import Paper from '@material-ui/core/Paper';

const imagePaths = [
  '/images/timetable/20210301.png',
  '/images/timetable/20210301@2x.png',
  '/images/timetable/20210301@3x.png',
];

const srcPath = imagePaths[1];
const srcSetPath = `${imagePaths[0]} 300w, ${imagePaths[1]} 768w, ${imagePaths[2]} 1280w`;

const TmpTimetable20210301 = () => (
  <Paper component="section" square>
    <img src={srcPath} srcSet={srcSetPath} style={{ width: '100%' }} />
  </Paper>
);

export default TmpTimetable20210301;
