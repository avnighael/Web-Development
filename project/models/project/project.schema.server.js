var mongoose = require('mongoose');

var projectSchema  = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'userModel'},
    title: String,
    description: String,
    organization: String,
    imageLink: String,
    url: String,
    videoLink: String,
    country: String,
    countryCode: String,
    address: String,
    funding: Number,
    goal: Number,
    causeName: String,
    approvedDate: Date,
    numberOfDonations: Number,
    comments:[{type: mongoose.Schema.Types.ObjectId, ref:'commentModel'}],
    dateCreated: {type:Date, default: Date.now()}
}, {collection: "project"});

module.exports = projectSchema;