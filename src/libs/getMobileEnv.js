import PropTypes from 'prop-types';
import { parse } from 'url';
import MobileDetect from 'mobile-detect';
import isStandaloneApp from './isStandaloneApp';

// @req: in getInitialProps of next.js
const getMobileEnv = (req) => {
  const isServer = req != null;
  const userAgent = isServer ? req.headers['user-agent'] : navigator.userAgent;
  const mobile = new MobileDetect(userAgent);
  const url = parse(isServer ? req.url : document.location.href, true);
  return {
    os: mobile.os(),
    iOS: mobile.is('iOS'),
    AndroidOS: mobile.is('AndroidOS'),
    ua: mobile.userAgent(),
    standalone: isStandaloneApp(url),
  };
};
export default getMobileEnv;
export const propTypes = {
  os: PropTypes.string,
  iOS: PropTypes.bool,
  AndroidOS: PropTypes.bool,
  ua: PropTypes.string,
  standalone: PropTypes.bool,
};
