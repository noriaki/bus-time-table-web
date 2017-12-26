import React from 'react';
import MobileDetect from 'mobile-detect';

// components
import MainLayout from '../layouts/MainLayout';
import AppInformation from '../components/AppInformation';
import AboutThisApp from '../components/AboutThisApp';
import withMaterialUI from '../containers/withMaterialUI';

const InfoPage = () => (
  <MainLayout>
    <AboutThisApp />
    <AppInformation />
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
