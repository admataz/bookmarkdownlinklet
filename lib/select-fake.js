var select = require('select');

var fakeHandlerCallback, fakeElem, selectedText, fakeHandler;

/**
 * Creates a fake textarea element, sets its value from `text` property,
 * and makes a selection on it.
 */
function selectFake(text) {
  var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

  removeFake();

  fakeHandlerCallback = () => removeFake();
  fakeHandler = document.body.addEventListener('click', fakeHandlerCallback) || true;

  fakeElem = document.createElement('textarea');
  // Prevent zooming on iOS
  fakeElem.style.fontSize = '12pt';
  // Reset box model
  fakeElem.style.border = '0';
  fakeElem.style.padding = '0';
  fakeElem.style.margin = '0';
  // Move element out of screen horizontally
  fakeElem.style.position = 'absolute';
  fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
  // Move element to the same position vertically
  let yPosition = window.pageYOffset || document.documentElement.scrollTop;
  fakeElem.style.top = yPosition + 'px';

  fakeElem.setAttribute('readonly', '');
  fakeElem.value = text;

  document.body.appendChild(fakeElem);

  selectedText = select(fakeElem);
  return copyText();
}

/**
 * Only removes the fake element after another click event, that way
 * a user can hit `Ctrl+C` to copy because selection still exists.
 */
function removeFake() {
  if (fakeHandler) {
    document.body.removeEventListener('click', fakeHandlerCallback);
    fakeHandler = null;
    fakeHandlerCallback = null;
  }

  if (fakeElem) {
    document.body.removeChild(fakeElem);
    fakeElem = null;
  }
}



/**
 * Executes the copy operation based on the current selection.
 */
function copyText() {
  var succeeded;

  try {
    succeeded = document.execCommand('copy');
  } catch (err) {
    succeeded = false;
  }

  return succeeded;
}



module.exports = selectFake;
