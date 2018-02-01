import getDisplayNameRecompose from 'recompose/getDisplayName';

export const getName = (displayName) => {
  const m = displayName.match(/\[([a-zA-Z0-9-_]*)\]$/);
  return m !== null ? m[1] : displayName;
};

export const getDisplayName = (subjectComponent) => {
  if (typeof subjectComponent.componentName === 'string') {
    return getName(subjectComponent.componentName);
  }
  return getDisplayNameRecompose(subjectComponent);
};

export const isContinueToDiving = (component, displayName) => {
  if (component != null) {
    if (displayName === 'Component') {
      return true;
    } else if (displayName === 'WithStyles' || displayName === 'WithTheme') {
      return true;
    } else if (/\([a-zA-Z0-9-_]*\)$/.test(displayName)) {
      return true;
    }
  }
  return false;
};

const getOriginalDisplayName = (Component) => {
  let subjectComponent = Component;
  let displayName = getDisplayName(subjectComponent);
  while (isContinueToDiving(subjectComponent, displayName)) {
    const innerComponent = subjectComponent.type || subjectComponent.Naked;
    displayName = getDisplayName(innerComponent);
    subjectComponent = innerComponent;
  }
  return displayName;
};

export default getOriginalDisplayName;
