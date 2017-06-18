var app = require('./express');
var bodyParser    = require('body-parser');
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.use(app.express.static(__dirname + '/public'));


var ourApp = require("./practice/angular/app.js");
ourApp(app);

//require('./project/app');

//require('./practice/session/app');

 require('./assignment/app');

require ("./test/app.js");

app.listen(process.env.PORT || 3000);