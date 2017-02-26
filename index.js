
var fakeHandlerCallback, fakeElem, selectedText, fakeHandler;

function select(element) {
  var selectedText;

  if (element.nodeName === 'SELECT') {
    element.focus();

    selectedText = element.value;
  } else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
    var isReadOnly = element.hasAttribute('readonly');

    if (!isReadOnly) {
      element.setAttribute('readonly', '');
    }

    element.select();
    element.setSelectionRange(0, element.value.length);

    if (!isReadOnly) {
      element.removeAttribute('readonly');
    }

    selectedText = element.value;
  } else {
    if (element.hasAttribute('contenteditable')) {
      element.focus();
    }

    var selection = window.getSelection();
    var range = document.createRange();

    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);

    selectedText = selection.toString();
  }

  return selectedText;
}


/**
 * Creates a fake textarea element, sets its value from `text` property,
 * and makes a selection on it.
 */
function clipboard(text) {
  var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

  removeFake();

  fakeHandlerCallback = function(){ removeFake() };
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
  var yPosition = window.pageYOffset || document.documentElement.scrollTop;
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

function collectWebItemData() {
  var webItem = {};
  var linkTitle = (document.title);
  var linkLocation = (window.location);
  var selectedText = '';

  if (window.getSelection) {
    selectedText = window.getSelection();
  } else if (document.getSelection) {
    selectedText = document.getSelection();
  } else if (document.selection) {
    selectedText = document.selection.createRange().text;
  }
  webItem.url = linkLocation.toString();
  webItem.title = linkTitle.toString();
  webItem.content = selectedText.toString();
  return webItem;
}


var webItem = collectWebItemData();
var output = "[" + webItem.title + "](" + webItem.url + ") \n " + webItem.content;
// window.prompt("link", output);
// return false;

var copied = clipboard(output);
if (copied) {
  alert('copied!')
} else {
  alert('failed to copy');
  throw (new Error(copied));
}
