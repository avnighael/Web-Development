var mongoose = require('mongoose');

var donationSchema  = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'userModel'},
    _project:String,
    amount: String
}, {
    collection: "donation",
    timestamps: true
});

module.exports = donationSchema;