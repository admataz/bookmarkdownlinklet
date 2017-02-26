(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.bookmarkdownlink = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var clipboard = require('./lib/select-fake');
var collectWebItemData = require('./lib/collect-webitem-data');

module.exports = function () {
  var webItem = collectWebItemData();
  var output = "[" + webItem.title + "](" + webItem.url + ") \n " + webItem.content;
  var copied = clipboard(output);
  if (!copied) {
    throw new Error(copied);
  }
};

},{"./lib/collect-webitem-data":2,"./lib/select-fake":3}],2:[function(require,module,exports){
'use strict';

module.exports = function collectWebItemData() {
  var webItem = {};
  var linkTitle = document.title;
  var linkLocation = window.location;
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
};

},{}],3:[function(require,module,exports){
'use strict';

var select = require('select');

var fakeHandlerCallback, fakeElem, selectedText, fakeHandler;

/**
 * Creates a fake textarea element, sets its value from `text` property,
 * and makes a selection on it.
 */
function selectFake(text) {
  var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

  removeFake();

  fakeHandlerCallback = function fakeHandlerCallback() {
    return removeFake();
  };
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

module.exports = selectFake;

},{"select":4}],4:[function(require,module,exports){
function select(element) {
    var selectedText;

    if (element.nodeName === 'SELECT') {
        element.focus();

        selectedText = element.value;
    }
    else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
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
    }
    else {
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

module.exports = select;

},{}]},{},[1])(1)
});