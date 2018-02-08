import { join } from 'path';
import { paths } from '../constants/pages';

const precache4NextJS = () => {
  if (typeof window === 'undefined') { return null; }
  // eslint-disable-next-line no-underscore-dangle
  const { buildStats, buildId } = window.__NEXT_DATA__;
  const promises = [];
  if (buildId != null && typeof buildId !== 'number') { // when not dev
    const pagePromises = paths.reduce((rets, pagePath) => {
      rets.push(fetchPage(pagePath));
      rets.push(fetchPageScript(pagePath, buildId));
      return rets;
    }, []);
    promises.push(...pagePromises);
  }
  if (buildStats != null) { // when not dev
    const appShellPromises = Object.keys(buildStats).map(buildStatsKey => (
      fetchAppShell(buildStatsKey, buildStats[buildStatsKey].hash)
    ));
    promises.push(...appShellPromises);
  }
  return Promise.all(promises);
};
export default precache4NextJS;

const fetchPage = pagePath => fetch(pagePath);
const fetchPageScript = (pagePath, buildId) => {
  const endpoint = join(
    '/_next', buildId.toString(), 'page', `${pagePath}.js`
  );
  return fetch(endpoint);
};
const fetchAppShell = (appShellFileName, buildHash) => {
  const endpoint = join('/_next', buildHash, appShellFileName);
  return fetch(endpoint);
};
