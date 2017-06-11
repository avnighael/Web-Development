var app = require('./express');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(app.express.static(__dirname + '/public'));

var ourApp = require("./practice/angular/app.js");
ourApp(app);


require('./assignment/app');

require ("./test/app.js");

app.listen(process.env.PORT || 4000);