'use strict';

var express = require('express');
var path = require('path');
var dir = process.cwd();
var fs = require("fs");
var url = require("url");
var Handlebars = require("handlebars");
var browserify = require("browserify");
var favicon = require('serve-favicon');
var through = require('through');
var options = require("./local.json");

var app = express();

var htmlUrls = url.parse(options.url.html),
    imagesUrls = url.parse(options.url.images),
    lessUrls = url.parse(options.url.less),
    cssUrls = url.parse(options.url.css),
    jsUrls = url.parse(options.url.js);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(imagesUrls.path,express.static(options.mount.images));
//app.use(cssUrls.path,express.static(options.mount.styles));
//app.use(jsUrls.path,express.static(options.mount.js));


var data = { "name": "Alan", "hometown": "Somewhere, TX","imagesUrl":options.url.images,
  "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};


Handlebars.registerHelper('script',(value)  => {
  value = jsUrls.href + value;
  return new Handlebars.SafeString('<script src="'+value+'"></script>');
});


app.get(htmlUrls.path + ':name',function(req,res){
  let name = req.params['name'],
      html = fs.readFileSync(path.join(dir,htmlUrls.path,name),"utf-8"),
      result = Handlebars.compile(html)(data);
  res.send(result);
});


app.get(jsUrls.path + ':name',function(req,res){
  var name = req.params['name'],
      b = browserify(path.resolve(options.mount.js, name), {
      basedir : dir
    });
    res.set('Content-Type', 'application/json');
    b.transform((f) =>{
      if (f.match(/\.js$/)) {
        return through(function (chunk) {
          this.queue(chunk);
          this.queue(null);
        });
      } else if (f.match(/\.css$/)) {
        var css = [];
        return through(function (chunk) {
          css.push(chunk);
        }, function () {
          css = Handlebars.compile(css.join(''))(options).replace(/(\r|\n)/g, '');
          this.queue(
              'var style = document.createElement("style");' +
              'style.innerHTML=\'' + css + '\';' +
              'document.getElementsByTagName("head")[0].appendChild(style);');
          this.queue(null);
        });
      }
    });
    b.bundle(function(e, buf) => {
      if (e) {
      console.error(e);
      res.sendStatus(500);
      return;
    }
    res.send(buf);
  });
});




app.use(favicon(path.resolve(dir, 'public/images/ico/favicon.ico')));
app.listen(8888);