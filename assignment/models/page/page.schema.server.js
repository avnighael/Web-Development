var mongoose = require('mongoose');

var pageSchema  = mongoose.Schema({
    _website: [{type: mongoose.Schema.Types.ObjectId, ref: 'websiteModel'}],
    name: {type: String},
    title: {type: String},
    description: {type: String},
    widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'widgetModel'}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "page"});

module.exports = pageSchema;