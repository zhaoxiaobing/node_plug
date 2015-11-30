var express = require('express');
var path = require('path');
var fs = require("fs");
var Handlebars = require("handlebars");
var url = require("./local.json");

var app = express();

var htmlUrl = url.html,
    imagesUrl = url.images,
    lessUrl = url.less,
    cssUrl = url.css,
    jsUrl = url.js;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(express.static(path.join(__dirname, 'public')));

var data = { "name": "Alan", "hometown": "Somewhere, TX","imagesUrl":imagesUrl,
  "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};

app.get('/:name',function(req,res) {
  var name = req.params['name'];
  html = fs.readFileSync(path.resolve('public/html',name),"utf-8");
  var result = Handlebars.compile(html)(data);
  res.send(result);
});


// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/

// error handlers




app.listen(9999);