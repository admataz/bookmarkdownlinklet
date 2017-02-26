module.exports = function collectWebItemData() {
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
