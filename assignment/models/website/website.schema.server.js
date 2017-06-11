var mongoose = require('mongoose');

var websiteSchema  = mongoose.Schema({
    _user: [{type: mongoose.Schema.Types.ObjectId, ref: 'userModel'}],
    name: {type: String},
    description: {type: String},
    pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'pageModel'}],
    dateCreated: {type: Date, default: Date.now},
    lastAccessed: {type: Date}
}, {collection: "website"});

module.exports = websiteSchema;