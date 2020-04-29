const isStandaloneApp = ({ query }) => (
  isAbleToDetect() ? (
    matchQueryString(query) || matchMediaQuery() || matchNavigatorProperty()
  ) : null
);
export default isStandaloneApp;

const isAbleToDetect = () => (
  typeof matchMedia === 'function' && typeof navigator === 'object'
);

const matchQueryString = query => query.display === 'standalone';
const matchMediaQuery = () => (
  typeof matchMedia === 'function' &&
    matchMedia('(display-mode: standalone)').matches
);
const matchNavigatorProperty = () => (
  typeof navigator === 'object' && Boolean(navigator.standalone)
);
