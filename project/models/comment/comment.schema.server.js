var mongoose = require('mongoose');

var commentSchema  = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'userModel'},
    _project: String,
    comment: String
}, {
    collection: "comments",
    timestamps: true
});

module.exports = commentSchema;