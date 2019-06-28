import React, { Fragment } from 'react';

// material-ui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// containers
/*
import {
  HomeTimetable,
  HigashiGinzaTimetable,
  ShimbashiTimetable,
} from '~/containers/TimetableContainer';
 */

const Timetables = () => (
  <Fragment>
    <Typography component="h2" variant="h6">
      時刻表
    </Typography>
    <Card>
      <CardMedia
        component="img"
        src={imgSrcSet[0]}
        srcSet={imgSrcSet} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          調整中のため画像のみ
        </Typography>
      </CardContent>
    </Card>
  </Fragment>
);

export default Timetables;

const imgSrcSet = [
  '/static/images/timetable/20171101timetable.jpg 1x',
  '/static/images/timetable/20171101timetable@2x.jpg 2x',
  '/static/images/timetable/20171101timetable@3x.jpg 3x',
];
