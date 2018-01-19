import React, { Fragment } from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardMedia, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import ForiOSStyles from '../../styles/AddToHomescreen/Contents-Style';

const stepTexts = [
  'ブラウザ下部アイコンをタップ',
  '「ホーム画面に追加」をタップ',
  '「追加」をタップ',
  'アイコンからいつでも起動OK',
];

const ForiOS = ({ classes }) => (
  <Fragment>
    <Typography type="title" className={classes.title}>
      3ステップでアプリ化
    </Typography>
    <ol className={classes.container}>
      { stepTexts.map(buildStepItem(classes)) }
    </ol>
  </Fragment>
);
export default withStyles(ForiOSStyles)(ForiOS);

const buildStepItem = classes => (text, index) => {
  const i = index + 1;
  const [imgSrc, ...imgSrcSet] = mapImgSrcSet(i);
  return (
    <li key={i} className={classes.item}>
      <Card>
        <CardMedia
          component="img"
          src={imgSrc}
          srcSet={imgSrcSet} />
        <CardContent>
          <Typography type="subheading">Step{ i }</Typography>
          <Typography>{ text }</Typography>
        </CardContent>
      </Card>
    </li>
  );
};

const mapImgSrcSet = index => ([
  `/static/images/getapp/ios/step0${index}.png`,
  `/static/images/getapp/ios/step0${index}@2x.png 2x`,
  `/static/images/getapp/ios/step0${index}@3x.png 3x`,
]);
