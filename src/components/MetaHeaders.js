import React, { Fragment } from 'react';

// constants
import { description } from '~/../package.json';

const MetaHeaders = () => (
  <Fragment key="headers">
    <title>
      シャトルバス時刻表・発車タイマー （中央区晴海のドゥ・トゥール/DEUX TOURS）
    </title>
    <meta name="description" content={description} />
    <meta name="mobile-web-app-capable" content="yes" />
    <link rel="manifest" href="/manifest.json" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-title" content="バス時刻表" />
    <link rel="apple-touch-icon" href="/icons/app.png" />
    <meta property="og:type" content="website" />
    <meta
      property="og:image"
      content="https://deux-tours-bus.com/icons/app.png"
    />
    <link rel="shortcut icon" href="/icons/favicon.ico" />
    <link rel="canonical" href="https://deux-tours-bus.com/" />
  </Fragment>
);

export default MetaHeaders;
