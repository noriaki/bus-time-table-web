import React, { Fragment } from 'react';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

// libs
import { momentFromVersion } from '../libs/timeTableDataHandler';

// data
import { version as appVersion } from '../package.json';
import timetableHome from '../data/home-timetable.json';
import timetableHigashiGinza from '../data/st-higashiginza-timetable.json';
import timetableShimbashi from '../data/st-shimbashi-timetable.json';

// style
import AboutThisAppStyles from '../styles/AboutThisApp-Style';

const AboutThisApp = ({ classes }) => (
  <Card>
    <CardHeader
      avatar={<Avatar aria-label="About this app">A</Avatar>}
      title="このアプリについて" />
    <CardContent className={classes.rootCardContent}>
      <Typography className={classes.appVersionTerm}>
        アプリバージョン
      </Typography>
      <Typography align="right">v{appVersion}</Typography>
      <Typography className={classes.timetableUpdateTerm}>
        時刻表更新日
      </Typography>
      { timetables.map(buildUpdatesAndVersion(classes)) }
      <Typography className={classes.authorTerm}>作者 (c) 2017</Typography>
      <Typography align="right">
        @noriaki
      </Typography>
      <Typography className={classes.authorTerm}>アイコン画像</Typography>
      <Typography align="right">
        Freepik
      </Typography>
    </CardContent>
  </Card>
);
export default withStyles(AboutThisAppStyles)(AboutThisApp);

const timetables = [{
  key: 'Home',
  name: timetableHome.name,
  version: momentFromVersion(timetableHome.version).format('YYYY/MM/DD'),
}, {
  key: 'HigashiGinza',
  name: timetableHigashiGinza.name,
  version: momentFromVersion(timetableHigashiGinza.version).format('YYYY/MM/DD'),
}, {
  key: 'Shimbashi',
  name: timetableShimbashi.name,
  version: momentFromVersion(timetableShimbashi.version).format('YYYY/MM/DD'),
}];

const buildUpdatesAndVersion = classes => ({
  key,
  name,
  version,
}) => (
  <Fragment key={key}>
    <Typography className={classes[`timetableUpdate${key}Term`]}>
      { name }
    </Typography>
    <Typography
      align="right"
      className={classes[`timetableUpdate${key}Version`]}>
      { version }
    </Typography>
  </Fragment>
);
