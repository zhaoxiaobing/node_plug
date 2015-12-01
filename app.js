var express = require('express');
var path = require('path');
var dir = process.cwd();
var fs = require("fs");
var url = require("url");
var Handlebars = require("handlebars");
var browserify = require("browserify");
var favicon = require('serve-favicon');
var through2 = require('through2');
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
app.use(cssUrls.path,express.static(options.mount.styles));


var data = { "name": "Alan", "hometown": "Somewhere, TX","imagesUrl":options.url.images,
  "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};


Handlebars.registerHelper('script',function(value){
  value = path.join(dir,jsUrls.path,value);
  var b = browserify(value);//.bundle();
  //b.pipe('./stdout.js');
  b.transform(function (file) {
    var data = '';
    console.log(file);
    return through(write, end);

    function write (buf) { data += buf }
    function end () {
      this.queue(coffee.compile(data));
      this.queue(null);
    }
  });
});

app.get(htmlUrls.path + ':name',function(req,res) {
  var name = req.params['name'];
  html = fs.readFileSync(path.join(dir,htmlUrls.path,name),"utf-8");
  var result = Handlebars.compile(html)(data);
  res.send(result);
});





//app.use(favicon(path.resolve(dir, 'public/images/ico/favicon.ico')));
app.listen(9999);