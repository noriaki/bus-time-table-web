import React from 'react';
import MobileDetect from 'mobile-detect';

// libs
import getOriginalDisplayName from '../libs/getOriginalDisplayName';

// components
import MainLayout from '../layouts/MainLayout';
import TableOfContents from '../components/TableOfContents';
import AboutThisApp from '../components/AboutThisApp';
import ChangeLogs from '../components/ChangeLogs';
import ContactForm from '../components/ContactForm';
import withMaterialUI from '../containers/withMaterialUI';

const labels = {
  [getOriginalDisplayName(AboutThisApp)]: 'このアプリについて',
  [getOriginalDisplayName(ChangeLogs)]: 'アプリ更新履歴',
  [getOriginalDisplayName(ContactForm)]: '要望・不具合の問い合わせ',
};

const InfoPage = () => (
  <MainLayout>
    <TableOfContents labels={labels}>
      <AboutThisApp />
      <ChangeLogs />
      <ContactForm />
    </TableOfContents>
  </MainLayout>
);
InfoPage.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return ({
    userAgent,
    os: (new MobileDetect(userAgent)).os(),
  });
};

export default withMaterialUI(InfoPage);
