import React, { Fragment } from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import ForiOSStyles from '../../styles/AddToHomescreen/iOS-Style';

const stepTexts = [
  'ブラウザ下部アイコンをタップ',
  '「ホーム画面に追加」をタップ',
  '「追加」をタップ',
  'アイコンからいつでも起動OK',
];

const ForiOS = ({ classes }) => (
  <Fragment>
    <Typography type="headline" className={classes.headline}>
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
        <CardContent>
          <img src={imgSrc} srcSet={imgSrcSet} alt={`Step${i}:${text}`} />
          <Typography type="headline" component="h2">Step{ i }</Typography>
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
