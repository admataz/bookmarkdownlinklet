# Bookmakdownlinklet

This is an experiment to create a bookmarklet that would allow me to capture the URL, title and selected text of the current page in my browser as a markdown link - and send it to my clipboard. 

Like this: 

```markdown
[Title](URL)
<SelectedText>
```


I thought I could do what I wanted with  [clipboard.js](https://clipboardjs.com/) for adding text to the clipboard, and [bookmarkletify](https://www.npmjs.com/package/bookmarkletify) to convert javascript source into the format needed for a bookmarklet... 

I discovered things are not so simple. 

Works in my tests with Chrome and Safari, but Firefox says: 

> document.execCommand(‘cut’/‘copy’) was denied because it was not called from inside a short running user-generated event handler.

Firefox is (probably rightly) denying access to the user's cliboard without a specific user action. 






