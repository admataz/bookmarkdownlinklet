# Bookmarkdownlinklet

> Note: This is experimental code. Take a look as a learning example, or use it and adapt it. It works for me. 

This is an experiment to create a bookmarklet that would allow me to capture the URL, title and selected text of the current page in my browser as a markdown link - and send it to my clipboard. 

Like this: 

```markdown
[Title](URL)
<SelectedText>
```
This would make it easy to grab links and quotes from pages while I'm reading. 

### The plan

I thought I could do all I wanted with  [clipboard.js](https://clipboardjs.com/) for adding text to the clipboard, and [bookmarkletify](https://www.npmjs.com/package/bookmarkletify) to converting and wrapping javascript source into the format needed for a bookmarklet... 
I already have a little bookmarklet for grabbing the content into a javascript prompt, but somehow the extra keyboard strokes of copying and dismissing the prompt seemed they needed improvement. 

Ideally this would be a one-click to my cliboard.

I discovered things are not so simple... 

### Discoveries: 

#### 1. Firefox is more strict access to the user's clipboard. 
Not a surprise really - but does make this a little less portable. 

Firefox says: 

> document.execCommand(‘cut’/‘copy’) was denied because it was not called from inside a short running user-generated event handler.

Firefox is (probably right about) denying access to the user's cliboard without a specific user action. This could be a bad thing to do from a privacy or usability point of view. But although I like using Firefox, this is for my own use in collecting links - so I don't mind. 

Works in my tests with Chrome and Safari. 

#### 2. UglifyJS does not recognise ES6 
I skipped using [babel](https://babeljs.io/) at first - thinking this would be ok in my browsers. But without it, UglifyJS would not parse the script if it contained ES6 features like arrow functions. This was unexpected, but easily fixed. 

That's about it. 

Uses [Browserify](http://browserify.org/) for building and transforms. 


If you just want the bookmarklet - add the contents of [the compiled bookmarklet script](./bookmarkdownlinklet.js) to a bookmark. Otherwise check out the code and see what you can do with it yourself. 

Copyright (c) 2017 Adam Davis 

License: MIT










