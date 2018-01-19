import React from 'react';
import PropTypes from 'prop-types';

// libs
import getMobileEnv, {
  propTypes as mobilePropTypes,
} from '../libs/getMobileEnv';

// components
import MainLayout from '../layouts/MainLayout';
import AddToHomescreen from '../components/AddToHomescreen';
import withMaterialUI from '../containers/withMaterialUI';

const GetappPage = ({ mobile }) => (
  <MainLayout mobile={mobile}>
    <AddToHomescreen os={mobile.os} />
  </MainLayout>
);
GetappPage.propTypes = {
  mobile: PropTypes.shape(mobilePropTypes).isRequired,
};
GetappPage.getInitialProps = async ({ req }) => ({
  mobile: getMobileEnv(req),
});

export default withMaterialUI(GetappPage);
