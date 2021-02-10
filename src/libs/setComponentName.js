import React from 'react';
import {
  compose,
  setStatic,
  setDisplayName,
} from 'recompose';
import getOriginalDisplayName from './getOriginalDisplayName';

const setComponentName = (name) => (BaseComponent) => {
  const componentName = `${getOriginalDisplayName(BaseComponent)}[${name}]`;
  const EnhancedComponent = (props) => (
    <BaseComponent {...props} />
  );
  const enhance = compose(
    setStatic('componentName', componentName),
    setDisplayName(componentName)
  );
  return enhance(EnhancedComponent);
};
export default setComponentName;
