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
    scriptsUrls = url.parse(options.url.scripts),
    jsUrls = url.parse(options.url.js);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(imagesUrls.path,express.static(options.mount.images));
app.use(jsUrls.path,express.static(options.mount.js));
//app.use(cssUrls.path,express.static(options.mount.styles));


var data = { "name": "Alan", "hometown": "Somewhere, TX","imagesUrl":options.url.images,
  "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};


Handlebars.registerHelper('script',function(value){
    var val = jsUrls.href + value;
    var b = browserify(path.resolve(options.mount.scripts, value));
    b.bundle(function(e, buf){
        if (e) {
            console.error(e);
            res.sendStatus(500);
            return;
        }
        fs.writeFileSync(path.resolve(options.mount.js, value), buf,'utf8');
        //res.send(buf);
    });
    return new Handlebars.SafeString('<script src="'+val+'"></script>');
});


app.get(htmlUrls.path + ':name',function(req,res){
    let name = req.params['name'],
        html = fs.readFileSync(path.join(dir,htmlUrls.path,name),"utf-8"),
        result = Handlebars.compile(html)(data);
    res.send(result);
});




/*app.get(jsUrls.path + ':name',function(req,res){
    var name = req.params['name'];
    var b = browserify(path.resolve(options.mount.scripts, name));
    //b.add(path.resolve(options.mount.js, name));
    //var data = b.bundle().pipe(process.stdout);
    //
    //through(function write(data) {
    //    this.queue(data) //data *must* not be null
    //},
    //function end () { //optional
    //    this.queue(null)
    //});

    //b.add();
    b.bundle(function(e, buf){
        if (e) {
            console.error(e);
            res.sendStatus(500);
            return;
        }
        fs.writeFileSync(path.resolve(options.mount.js, name), buf,'utf8');
        res.send(buf);
    });

});*/




app.use(favicon(path.resolve(dir, 'public/images/ico/favicon.ico')));
app.listen(8888);