var mongoose = require('mongoose');

var projectSchema  = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'userModel'},
    title: String,
    description: String,
    organization: String,
    urlToImage: String,
    url: String,
    urlToVideo: String,
    country: String,
    countryCode: String,
    funding: Number,
    goal: Number,
    causeName: String,
    comments:[{type: mongoose.Schema.Types.ObjectId, ref:'commentModel'}],
    dateCreated: {type:Date, default: Date.now()}
}, {collection: "project"});

module.exports = projectSchema;