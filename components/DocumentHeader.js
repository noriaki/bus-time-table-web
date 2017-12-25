import React from 'react';
import Head from 'next/head';

const DocumentHeader = ({ title, description, baseURI }) => (
  <Head>
    <meta charSet="utf-8" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="mobile-web-app-capable" content="yes" />
    <link rel="manifest" href="/static/manifest.json" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-title" content="バス時刻表" />
    <link rel="apple-touch-icon-precomposed" href="/static/icons/app.png" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content={`${baseURI}/static/icons/app.png`} />
  </Head>
);
export default DocumentHeader;
