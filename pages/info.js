import React from 'react';
import PropTypes from 'prop-types';

// libs
import getOriginalDisplayName from '../libs/getOriginalDisplayName';
import getMobileEnv, {
  propTypes as mobilePropTypes,
} from '../libs/getMobileEnv';

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

const InfoPage = ({ mobile }) => (
  <MainLayout mobile={mobile}>
    <TableOfContents labels={labels}>
      <ChangeLogs />
      <AboutThisApp />
      <ContactForm />
    </TableOfContents>
  </MainLayout>
);
InfoPage.propTypes = {
  mobile: PropTypes.shape(mobilePropTypes).isRequired,
};
InfoPage.getInitialProps = async ({ req }) => ({
  mobile: getMobileEnv(req),
});

export default withMaterialUI(InfoPage);
