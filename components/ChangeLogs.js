import React from 'react';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Badge from 'material-ui/Badge';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

// data
import logs from '../data/changelogs.json';

// style
import ChangeLogsStyles from '../styles/ChangeLogs-Style';

const ChangeLogs = ({ classes }) => (
  <section>
    <Typography type="headline" className={classes.headline}>
      アプリ更新履歴
    </Typography>
    { logs.map(buildChangeLog(classes)) }
  </section>
);
ChangeLogs.displayName = 'ChangeLogs';
export default withStyles(ChangeLogsStyles)(ChangeLogs);

const replaceVersionString = version => version.replace(/^v/, 'バージョン');

const buildChangeLog = classes => ({
  version,
  date,
  subjects,
}, index) => {
  const longVersion = replaceVersionString(version);
  const badgedTitle = (title) => {
    const { badge } = classes;
    return (
      <Badge badgeContent="new" color="accent" classes={{ badge }}>
        {title}
      </Badge>
    );
  };
  const isFirst = index === 0;
  return (
    <Card key={version} className={classes.card}>
      <CardHeader
        title={isFirst ? badgedTitle(longVersion) : longVersion}
        subheader={date} />
      <CardContent className={classes.rootCardContent}>
        <ul className={classes.subjects}>
          { subjects.map(buildChangeLogItem(classes)) }
        </ul>
      </CardContent>
    </Card>
  );
};

const buildChangeLogItem = classes => (subject, index) => (
  <li key={index} className={classes.subject}>
    <Typography type="body1">{ subject }</Typography>
  </li>
);
