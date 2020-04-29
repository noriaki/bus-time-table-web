export const trackID = 'UA-97608334-1';

export const initCode = `
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());

  gtag('config', '${trackID}', {
     page_path: '/',
     transport_type: 'beacon',
  });
`;

export const gtag = (...args) => {
  if (args.length > 0) { window.gtag(...args); }
  return window.gtag;
};

export const trackEvent = ({
  action,
  category: event_category, // eslint-disable-line camelcase
  label: event_label, // eslint-disable-line camelcase
}) => gtag('event', action, { event_category, event_label });

export const trackMovePrev = departure => trackEvent({
  action: 'Prev', category: 'Timer', label: departure,
});
export const trackMoveNext = departure => trackEvent({
  action: 'Next', category: 'Timer', label: departure,
});
export const trackMoveFront = departure => trackEvent({
  action: 'Front', category: 'Timer', label: departure,
});
export const trackMoveLast = departure => trackEvent({
  action: 'Last', category: 'Timer', label: departure,
});

export default {
  trackID,
  initCode,
  gtag,
  trackEvent,
  trackMovePrev,
  trackMoveNext,
  trackMoveFront,
  trackMoveLast,
};
