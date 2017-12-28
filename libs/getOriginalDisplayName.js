import getDisplayName from 'recompose/getDisplayName';

const getOriginalDisplayName = (Component) => {
  let subjectComponent = Component;
  let displayName = getDisplayName(subjectComponent);
  while (
    subjectComponent != null &&
    (displayName === 'Component' || /\([a-zA-Z0-9-_]*\)/.test(displayName))
  ) {
    const innerComponent = subjectComponent.type || subjectComponent.Naked;
    displayName = getDisplayName(innerComponent);
    subjectComponent = innerComponent;
  }
  return displayName;
};

export default getOriginalDisplayName;
