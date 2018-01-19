import React from 'react';

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
  [getOriginalDisplayName(ChangeLogs)]: 'アプリ更新履歴',
  [getOriginalDisplayName(AboutThisApp)]: 'このアプリについて',
  [getOriginalDisplayName(ContactForm)]: '要望・不具合の問い合わせ',
};

const InfoPage = () => (
  <MainLayout>
    <TableOfContents labels={labels}>
      <ChangeLogs />
      <AboutThisApp />
      <ContactForm />
    </TableOfContents>
  </MainLayout>
);

export default withMaterialUI(InfoPage);
