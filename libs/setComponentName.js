import React from 'react';
import {
  compose,
  getDisplayName,
  setStatic,
  setDisplayName,
} from 'recompose';

const setComponentName = name => (BaseComponent) => {
  const componentName = `${getDisplayName(BaseComponent)}[${name}]`;
  const EnhancedComponent = props => (
    <BaseComponent {...props} />
  );
  const enhance = compose(
    setStatic('componentName', componentName),
    setDisplayName(componentName)
  );
  return enhance(EnhancedComponent);
};
export default setComponentName;
