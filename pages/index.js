import React from 'react';
import PropTypes from 'prop-types';

// libs
import getMobileEnv, {
  propTypes as mobilePropTypes,
} from '../libs/getMobileEnv';

// components
import MainLayout from '../layouts/MainLayout';
import TimersBoard from '../components/TimersBoard';
import withMaterialUI from '../containers/withMaterialUI';

const IndexPage = ({ mobile }) => (
  <MainLayout mobile={mobile}>
    <TimersBoard />
  </MainLayout>
);
IndexPage.propTypes = {
  mobile: PropTypes.shape(mobilePropTypes).isRequired,
};
IndexPage.getInitialProps = async ({ req }) => ({
  mobile: getMobileEnv(req),
});

export default withMaterialUI(IndexPage);
