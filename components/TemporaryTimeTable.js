import React from 'react';
import { Card, CardHeader, CardText, CardMedia } from 'material-ui/Card';

const TemporaryTimeTable = () => (
  <Card>
    <CardHeader
      title="2017/11/01以降の時刻表"
      subtitle="暫定版（画像の時刻表は最新です）" />
    <CardMedia>
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
    </CardMedia>
    <CardText>
      現在、アプリの新時刻表対応を鋭意進めています。<br />
      完了後にアプリは自動で更新されますので少々お待ちください。
    </CardText>
  </Card>
);
export default TemporaryTimeTable;
