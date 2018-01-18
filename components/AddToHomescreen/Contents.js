import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

// components
import ForiOS from './iOS';
import ForAndroid from './Android';

// styles
import ContentsStyles from '../../styles/AddToHomescreen/Contents-Style';

const Contents = ({ os, classes }) => {
  let innerContents;
  if (os === 'iOS') {
    innerContents = <ForiOS />;
  } else if (os === 'AndroidOS') {
    innerContents = <ForAndroid />;
  } else {
    innerContents = <p>ご利用中の端末は対応していないようです</p>;
  }
  return (
    <section>
      <Typography className={classes.description}>
        急いでいるときにも簡単にすぐ起動できるよう、ホーム画面にアプリとして配置（ダウンロード）することが可能です。
        <Typography type="caption" component="span">
          容量 10KB(0.01MB)以下
        </Typography>
      </Typography>
      { innerContents }
    </section>
  );
};
export default withStyles(ContentsStyles)(Contents);
