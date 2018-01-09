import React from 'react';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const TemporaryTimeTable = () => (
  <Card>
    <CardContent>
      <picture>
        <source
          media="(min-width: 450px)"
          srcSet="/static/images/20171101timetable@3x.jpg" />
        <img
          src="/static/images/20171101timetable.jpg"
          srcSet="/static/images/20171101timetable@2x.jpg 2x,/static/images/20171101timetable@3x.jpg 3x"
          alt="2017/11/11以降のシャトルバス時刻表"
          style={{ width: '100%' }} />
      </picture>
      <Typography type="caption" align="center">
        見やすくなるよう対応中ですので、少々お待ちください
      </Typography>
    </CardContent>
  </Card>
);
export default TemporaryTimeTable;
