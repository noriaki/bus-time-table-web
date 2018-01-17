import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

// components
import ForiOS from './iOS';

// styles
import ContentsStyles from '../../styles/AddToHomescreen/Contents-Style';

const Temp = () => <p>android</p>;

const Contents = ({ os, classes }) => {
  let innerContents;
  if (os === 'iOS') {
    innerContents = <ForiOS />;
  } else if (os === 'AndroidOS') {
    innerContents = <Temp />;
  } else {
    innerContents = <p>Other</p>;
  }
  return (
    <section className={classes.container}>
      <Typography type="headline">
        アプリをホーム画面に追加
      </Typography>
      <Typography>
        急いでいるときにも簡単にすぐ起動できるよう、ホーム画面にアプリとして配置（ダウンロード）することが可能です。
        <Typography
          type="caption"
          component="span"
          className={classes.caption}>
          容量 10KB(0.01MB)以下
        </Typography>
      </Typography>
      { innerContents }
    </section>
  );
};
export default withStyles(ContentsStyles)(Contents);
