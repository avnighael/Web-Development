var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/WebsiteAppMaker');
mongoose.Promise = require('q').Promise;

var connectionString = 'mongodb://127.0.0.1:27017/Handouts'; // for local

// if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
//     var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
//     var password = process.env.MLAB_PASSWORD_WEBDEV;
//     connectionString = 'mongodb://' + username + ':' + password;
//     connectionString += '@ds011775.mlab.com:11775/heroku_4l5x0w1r'; // user yours
// }

//var mongoose = require("mongoose");
mongoose.connect(connectionString);

require('./services/user.service.server');
require('./services/project.service.server');
require('./services/donation.service.server');
