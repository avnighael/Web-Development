var mongoose = require('mongoose');
var donationSchema = require('./donation.schema.server');
var donationModel = mongoose.model('donationModel', donationSchema);

donationModel.sendDonation = sendDonation;
donationModel.getDonationHistory = getDonationHistory;
donationModel.deleteDonation = deleteDonation;

module.exports = donationModel;

function deleteDonation(donationId) {
    return donationModel
        .remove({_id: donationId});
}

function getDonationHistory(userId) {
    return donationModel
        .find({_user: userId})
        .populate('_user', 'username firstName lastName')
        .exec()
}


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
