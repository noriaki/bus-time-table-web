const isStandaloneApp = ({ query }) => {
  if (query.display === 'standalone') { return true; }
  const g = global || window;
  if (typeof g.matchMedia === 'function') {
    return g.matchMedia('(display-mode: standalone)').matches;
  }
  if (g.navigator) { return g.navigator.standalone != null; }
  return null;
};
export default isStandaloneApp;
