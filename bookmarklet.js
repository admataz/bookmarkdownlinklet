javascript:(function(){;function%20select(e)%7Bvar%20t;if(%22SELECT%22===e.nodeName)e.focus(),t=e.value;else%20if(%22INPUT%22===e.nodeName%7C%7C%22TEXTAREA%22===e.nodeName)%7Bvar%20l=e.hasAttribute(%22readonly%22);l%7C%7Ce.setAttribute(%22readonly%22,%22%22),e.select(),e.setSelectionRange(0,e.value.length),l%7C%7Ce.removeAttribute(%22readonly%22),t=e.value%7Delse%7Be.hasAttribute(%22contenteditable%22)&&e.focus();var%20a=window.getSelection(),n=document.createRange();n.selectNodeContents(e),a.removeAllRanges(),a.addRange(n),t=a.toString()%7Dreturn%20t%7Dfunction%20clipboard(e)%7Bvar%20t=%22rtl%22==document.documentElement.getAttribute(%22dir%22);removeFake(),fakeHandlerCallback=function()%7BremoveFake()%7D,fakeHandler=document.body.addEventListener(%22click%22,fakeHandlerCallback)%7C%7C!0,fakeElem=document.createElement(%22textarea%22),fakeElem.style.fontSize=%2212pt%22,fakeElem.style.border=%220%22,fakeElem.style.padding=%220%22,fakeElem.style.margin=%220%22,fakeElem.style.position=%22absolute%22,fakeElem.style%5Bt?%22right%22:%22left%22%5D=%22-9999px%22;var%20l=window.pageYOffset%7C%7Cdocument.documentElement.scrollTop;return%20fakeElem.style.top=l+%22px%22,fakeElem.setAttribute(%22readonly%22,%22%22),fakeElem.value=e,document.body.appendChild(fakeElem),selectedText=select(fakeElem),copyText()%7Dfunction%20removeFake()%7BfakeHandler&&(document.body.removeEventListener(%22click%22,fakeHandlerCallback),fakeHandler=null,fakeHandlerCallback=null),fakeElem&&(document.body.removeChild(fakeElem),fakeElem=null)%7Dfunction%20copyText()%7Bvar%20e;try%7Be=document.execCommand(%22copy%22)%7Dcatch(t)%7Be=!1%7Dreturn%20e%7Dfunction%20collectWebItemData()%7Bvar%20e=%7B%7D,t=document.title,l=window.location,a=%22%22;return%20window.getSelection?a=window.getSelection():document.getSelection?a=document.getSelection():document.selection&&(a=document.selection.createRange().text),e.url=l.toString(),e.title=t.toString(),e.content=a.toString(),e%7Dvar%20fakeHandlerCallback,fakeElem,selectedText,fakeHandler,webItem=collectWebItemData(),output=%22%5B%22+webItem.title+%22%5D(%22+webItem.url+%22)%20%5Cn%20%22+webItem.content,copied=clipboard(output);if(!copied)throw%20alert(%22failed%20to%20copy%22),new%20Error(copied);alert(%22copied!%22);;})()