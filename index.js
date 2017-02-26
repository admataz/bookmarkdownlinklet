const clipboard = require('./lib/select-fake');
const collectWebItemData = require('./lib/collect-webitem-data');


module.exports = function() {
  var webItem = collectWebItemData();
  var output = "[" + webItem.title + "](" + webItem.url + ") \n " + webItem.content;
  var copied = clipboard(output);
  if (!copied) {
    throw (new Error(copied));
  }
}
