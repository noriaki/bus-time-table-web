const copyToClipboard = (text) => {
  const range = document.createRange();
  const selection = document.getSelection();

  const mark = document.createElement('span');
  mark.textContent = text;
  // reset user styles for span element
  mark.style.all = 'unset';
  // prevents scrolling to the end of the page
  mark.style.position = 'fixed';
  mark.style.top = 0;
  mark.style.clip = 'rect(0, 0, 0, 0)';
  // used to preserve spaces and line breaks
  mark.style.whiteSpace = 'pre';
  // do not inherit user-select (it may be `none`)
  mark.style.webkitUserSelect = 'text';
  mark.style.MozUserSelect = 'text';
  mark.style.msUserSelect = 'text';
  mark.style.userSelect = 'text';

  document.body.appendChild(mark);

  range.selectNode(mark);
  selection.addRange(range);

  const successful = document.execCommand('copy');

  setTimeout(() => {
    selection.removeAllRanges();
    document.body.removeChild(mark);
  }, 1000);

  return successful;
};

export default copyToClipboard;
