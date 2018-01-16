import React from 'react';

// components
import ForiOS from './iOS';

const Temp = () => <p>android</p>;
const AddToHomescreen = ({ os }) => {
  if (os === 'iOS') {
    return <ForiOS />;
  } else if (os === 'AndroidOS') {
    return <Temp />;
  }
  return (
    <p>PC</p>
  );
};
export default AddToHomescreen;
