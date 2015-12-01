var express = require('express');
var path = require('path');
//var dir = process.cwd();
var fs = require("fs");
var url = require("url");
var Handlebars = require("handlebars");
var favicon = require('serve-favicon');
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


/*Handlebars.registerHelper('script',function(value){
  value = path.resolve(jsUrl,value);
  console.log(value);
});*/

app.get(htmlUrls.path + ':name',function(req,res) {
  var name = req.params['name'];
  //html = fs.readFileSync(path.join(dir,name),"utf-8");
  console.log(name);
  //console.log(path.join(process.cwd(),dir,name));
  //var result = Handlebars.compile(html)(data);
  //res.send(result);
});





//app.use(favicon(path.resolve(dir, 'public/images/ico/favicon.ico')));
app.listen(9999);