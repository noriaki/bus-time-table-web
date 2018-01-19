import React, { Fragment } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import ForPCStyles from '../../styles/AddToHomescreen/Contents-Style';

const ForPC = ({ classes }) => (
  <Fragment>
    <Typography type="title" className={classes.title}>
      お使いの端末は未対応のようです
    </Typography>
    <Typography>
      スマートフォン(iOS, Android)でお試しください。
      <br />
      下記のQRコードをスマートフォンで読み取るとページが開きます。
    </Typography>
    <Typography>
      <img src={qrURL} alt="https://deux-tours-bus.com" />
    </Typography>
  </Fragment>
);
export default withStyles(ForPCStyles)(ForPC);

const encodedURL = encodeURIComponent('https://deux-tours-bus.com');
const qrURL = (
  `https://chart.apis.google.com/chart?chs=200x200&cht=qr&chl=${encodedURL}`
);
