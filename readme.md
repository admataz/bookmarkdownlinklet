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


If you just want the bookmarklet - drag the link below to your bookmark menu bar. Otherwise check out the code and see what you can do with it yourself. 

[✚ `[Title](url)<selection>`](javascript:(function(){;(function(f)%7Bif(typeof%20exports===%22object%22&&typeof%20module!==%22undefined%22)%7Bmodule.exports=f()%7Delse%20if(typeof%20define===%22function%22&&define.amd)%7Bdefine(%5B%5D,f)%7Delse%7Bvar%20g;if(typeof%20window!==%22undefined%22)%7Bg=window%7Delse%20if(typeof%20global!==%22undefined%22)%7Bg=global%7Delse%20if(typeof%20self!==%22undefined%22)%7Bg=self%7Delse%7Bg=this%7Dg.bookmarkdownlink=f()%7D%7D)(function()%7Bvar%20define,module,exports;return%20function%20e(t,n,r)%7Bfunction%20s(o,u)%7Bif(!n%5Bo%5D)%7Bif(!t%5Bo%5D)%7Bvar%20a=typeof%20require==%22function%22&&require;if(!u&&a)return%20a(o,!0);if(i)return%20i(o,!0);var%20f=new%20Error(%22Cannot%20find%20module%20'%22+o+%22'%22);throw%20f.code=%22MODULE_NOT_FOUND%22,f%7Dvar%20l=n%5Bo%5D=%7Bexports:%7B%7D%7D;t%5Bo%5D%5B0%5D.call(l.exports,function(e)%7Bvar%20n=t%5Bo%5D%5B1%5D%5Be%5D;return%20s(n?n:e)%7D,l,l.exports,e,t,n,r)%7Dreturn%20n%5Bo%5D.exports%7Dvar%20i=typeof%20require==%22function%22&&require;for(var%20o=0;o%3Cr.length;o++)s(r%5Bo%5D);return%20s%7D(%7B1:%5Bfunction(require,module,exports)%7B%22use%20strict%22;var%20clipboard=require(%22./lib/select-fake%22);var%20collectWebItemData=require(%22./lib/collect-webitem-data%22);module.exports=function()%7Bvar%20webItem=collectWebItemData();var%20output=%22%5B%22+webItem.title+%22%5D(%22+webItem.url+%22)%20%5Cn%20%22+webItem.content;var%20copied=clipboard(output);if(!copied)%7Bthrow%20new%20Error(copied)%7D%7D%7D,%7B%22./lib/collect-webitem-data%22:2,%22./lib/select-fake%22:3%7D%5D,2:%5Bfunction(require,module,exports)%7B%22use%20strict%22;module.exports=function%20collectWebItemData()%7Bvar%20webItem=%7B%7D;var%20linkTitle=document.title;var%20linkLocation=window.location;var%20selectedText=%22%22;if(window.getSelection)%7BselectedText=window.getSelection()%7Delse%20if(document.getSelection)%7BselectedText=document.getSelection()%7Delse%20if(document.selection)%7BselectedText=document.selection.createRange().text%7DwebItem.url=linkLocation.toString();webItem.title=linkTitle.toString();webItem.content=selectedText.toString();return%20webItem%7D%7D,%7B%7D%5D,3:%5Bfunction(require,module,exports)%7B%22use%20strict%22;var%20select=require(%22select%22);var%20fakeHandlerCallback,fakeElem,selectedText,fakeHandler;function%20selectFake(text)%7Bvar%20isRTL=document.documentElement.getAttribute(%22dir%22)==%22rtl%22;removeFake();fakeHandlerCallback=function%20fakeHandlerCallback()%7Breturn%20removeFake()%7D;fakeHandler=document.body.addEventListener(%22click%22,fakeHandlerCallback)%7C%7Ctrue;fakeElem=document.createElement(%22textarea%22);fakeElem.style.fontSize=%2212pt%22;fakeElem.style.border=%220%22;fakeElem.style.padding=%220%22;fakeElem.style.margin=%220%22;fakeElem.style.position=%22absolute%22;fakeElem.style%5BisRTL?%22right%22:%22left%22%5D=%22-9999px%22;var%20yPosition=window.pageYOffset%7C%7Cdocument.documentElement.scrollTop;fakeElem.style.top=yPosition+%22px%22;fakeElem.setAttribute(%22readonly%22,%22%22);fakeElem.value=text;document.body.appendChild(fakeElem);selectedText=select(fakeElem);return%20copyText()%7Dfunction%20removeFake()%7Bif(fakeHandler)%7Bdocument.body.removeEventListener(%22click%22,fakeHandlerCallback);fakeHandler=null;fakeHandlerCallback=null%7Dif(fakeElem)%7Bdocument.body.removeChild(fakeElem);fakeElem=null%7D%7Dfunction%20copyText()%7Bvar%20succeeded;try%7Bsucceeded=document.execCommand(%22copy%22)%7Dcatch(err)%7Bsucceeded=false%7Dreturn%20succeeded%7Dmodule.exports=selectFake%7D,%7Bselect:4%7D%5D,4:%5Bfunction(require,module,exports)%7Bfunction%20select(element)%7Bvar%20selectedText;if(element.nodeName===%22SELECT%22)%7Belement.focus();selectedText=element.value%7Delse%20if(element.nodeName===%22INPUT%22%7C%7Celement.nodeName===%22TEXTAREA%22)%7Bvar%20isReadOnly=element.hasAttribute(%22readonly%22);if(!isReadOnly)%7Belement.setAttribute(%22readonly%22,%22%22)%7Delement.select();element.setSelectionRange(0,element.value.length);if(!isReadOnly)%7Belement.removeAttribute(%22readonly%22)%7DselectedText=element.value%7Delse%7Bif(element.hasAttribute(%22contenteditable%22))%7Belement.focus()%7Dvar%20selection=window.getSelection();var%20range=document.createRange();range.selectNodeContents(element);selection.removeAllRanges();selection.addRange(range);selectedText=selection.toString()%7Dreturn%20selectedText%7Dmodule.exports=select%7D,%7B%7D%5D%7D,%7B%7D,%5B1%5D)(1)%7D);bookmarkdownlink();})()))


Copyright (c) 2017 Adam Davis 

License: MIT










