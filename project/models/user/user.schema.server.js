var mongoose = require('mongoose');

var userSchema  = mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    country: String,
    organization: String,
    followers: [{type: mongoose.Schema.Types.ObjectId, ref:'userModel'}],  //For non-profit organization
    following: [{type: mongoose.Schema.Types.ObjectId, ref:'userModel'}], //For donors
    registrationNumber: String,  //For non-profit Organization
    // projects: [{type: mongoose.Schema.Types.ObjectId, ref:'projectModel'}],
    projects: [{
        projectId: String,
        title: String,
        organization: String,
        country: String,
        causeName: String,
        imageLink: String}],
    favourites: [{                  //for donors
        projectId: String,
        title: String,
        organization: String,
        country: String,
        causeName: String,
        imageLink: String}],
    cause: String,  //For non-profit organization
    profilePic:{
        "url":{type: String}, "width":{type:String}},
        url:{type:String},
    role: {type: String, enum: ['DONOR', 'ORGANIZATION', 'ADMIN'], default: 'DONOR'},
    dateCreated:{type: Date, default: Date.now},

    google: {
        id:    String,
        token: String
    },

    facebook: {
        id:    String,
        token: String,
    }
}, {collection: "user"});

module.exports = userSchema;