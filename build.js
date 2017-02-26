const fs = require('fs');
const browserify = require('browserify');
const bookmarkletify = require('bookmarkletify');

// var uglify = require("uglify-js");

// var bookmarkletify = function() {
//   var min = encodeURI(uglify.minify('./index.js').code);
//   var result = 'javascript:(function(){;' + min + ';})()';
//   return result;
// }

// function minify(source) {
//   var ast = uglify.minify(source);
//   return pro(ast);
// }

var b = browserify({ basedir: './', standalone: 'bookmarkdownlink' })
  .transform('babelify')
  .add('./index.js')
  .bundle((err, buf) => {
    if (err) {
      return console.log(err);
    }
    let script = buf.toString();
    let output = bookmarkletify(script + 'bookmarkdownlink();');


    fs.writeFileSync('./bookmarkdownlink.js', script);
    fs.writeFileSync('./bookmarkdownlinklet.js', output);
    console.log('created bookmaklet.js');

  });
