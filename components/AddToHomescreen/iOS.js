import React from 'react';
import Card, {
  CardHeader,
  CardMedia,
  CardContent,
} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';

const ForiOS = () => (
  <Card>
    <CardHeader
      avatar={<Avatar aria-label="Step1">1</Avatar>}
      title="Step1" />
    <CardMedia
      style={{ height: 70, margin: '0 8px' }}
      image="/static/images/ios-add-to-homescreen-step01.jpg" />
    <CardContent>
      <Typography>ブラウザ下部アイコンをタップ</Typography>
    </CardContent>
  </Card>
);
export default ForiOS;
