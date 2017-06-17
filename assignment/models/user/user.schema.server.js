var mongoose = require('mongoose');

var userSchema  = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    roles: [{type: String,
        default: 'USER',
        enum:['USER', 'ADMIN']}],
    websites:[{type: mongoose.Schema.Types.ObjectId, ref: 'websiteModel'}],
    dateCreated:{type: Date, default: Date.now}
}, {collection: "user"});

module.exports = userSchema;