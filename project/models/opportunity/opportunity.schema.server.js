var mongoose = require('mongoose');

var opportunitySchema  = mongoose.Schema({
    projectId: String,
    title: String,
    description: String,
    skills: String,
    commitment: String,
    startDate: {type : Date , default :Date.now()},
    endDate : {type : Date , default :Date.now()},
    location: {type : String},
    longitude : {type : String},
    latitude : {type : String},
    dateCreated : {type : Date , default :Date.now()},
    imageUrl : String,
    _createdBy: {type :mongoose.Schema.Types.ObjectId , ref:'userModel'},
    _volunteers: [{type :mongoose.Schema.Types.ObjectId , ref:'userModel'}]
}, {collection: "opportunities"});

module.exports = opportunitySchema;