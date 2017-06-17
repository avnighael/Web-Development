var mongoose = require('mongoose');
var donationSchema = require('./donation.schema.server');
var donationModel = mongoose.model('donationModel', donationSchema);

donationModel.sendDonation = sendDonation;

module.exports = donationModel;


function sendDonation(userId, projectId, dAmmount) {
    var donation = {_user: userId,
        _project: projectId,
        amount: dAmmount.amount}

    return donationModel
        .create(donation)
        .then(function (status) {
            return status;
        }, function (err) {
            return err;
        })
}
