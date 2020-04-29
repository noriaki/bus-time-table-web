import React from 'react';

// material-ui
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';

const ShareButton = () => {
  if (window.navigator.share === undefined) { return null; }

  const onClickFn = () => {
    const title = 'ドゥ・トゥール/DEUX TOURS シャトルバス時刻表・発車タイマー';

    let url = window.document.location.href;
    const canonicalEl = window.document.querySelector('link[rel="canonical"]');
    if (canonicalEl !== null) { url = canonicalEl.href; }

    window.navigator.share({ title, url })
      .then((ret) => console.log(ret))
      .catch((err) => console.error(err));
  };

  return (
    <IconButton
      onClick={onClickFn}
      edge="end"
      aria-label="share this app with native share menu"
      color="inherit">
      <ShareIcon />
    </IconButton>
  );
};

export default ShareButton;
