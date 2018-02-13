import { join } from 'path';
import {
  composableFetch as cf,
  delays,
  tryCatchP,
  pipeP,
} from 'composable-fetch';
import { paths } from '../constants/pages';

const createFetch = () => tryCatchP(
  pipeP(
    cf.retryable(fetch),
    cf.withTimeout(2000),
    cf.withRetry(3, delays.exponential(2000)),
    cf.checkStatus
  ),
  cf.logFetchError
);

const precache4NextJS = () => {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('No executable env (e.g. Server-side)'));
  }
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

const fetchPage = (pagePath) => {
  const f = createFetch();
  return f(pagePath);
};
const fetchPageScript = (pagePath, buildId) => {
  const f = createFetch();
  const endpoint = join(
    '/_next', buildId.toString(), 'page', `${pagePath}.js`
  );
  return f(endpoint);
};
const fetchAppShell = (appShellFileName, buildHash) => {
  const f = createFetch();
  const endpoint = join('/_next', buildHash, appShellFileName);
  return f(endpoint);
};
