const fs = require('fs');
// const browserify = require('browserify');
// // const bm = require('bookmarkletify');

var uglify = require("uglify-js");

var bookmarkletify = function() {
  var min = encodeURI(uglify.minify('./index.js').code);
  var result = 'javascript:(function(){;' + min + ';})()';
  return result;
}

// function minify(source) {
//   var ast = uglify.minify(source);
//   return pro(ast);
// }

// var b = browserify(['./index.js'], { standalone: 'mdcopylink' });
// b.bundle((err, buf) => {
//   if (err) {
//     return console.log(err);
//   }

//   console.log(buf.toString());
  let output = bookmarkletify();

  fs.writeFileSync('./bookmarklet.js', output);
  console.log('created bookmaklet.js');

// });
