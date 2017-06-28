var app = require('../../express');
var donationModel = require('../models/donation/donation.model.server');

app.post('/api/project/user/:userId/project/:projectId/donate', sendDonation);
app.get('/api/project/user/:userId/getDonations', getDonationHistory);

function getDonationHistory(req, res) {
    var userId = req.params.userId;

    donationModel
        .getDonationHistory(userId)
        .then(function (response) {
            res.json(response);
        },function (err) {
            res.send(err);
        });
}

function sendDonation(req, res) {
    var userId = req.params.userId;
    var projectId = req.params.projectId;
    var donation = req.body;
    console.log(donation);
    console.log(projectId);

//console.log(userId);
    donationModel
        .sendDonation(userId, projectId, donation)
        .then(function (response) {
            console.log(response);
            res.json(response);
        },function (err) {
            res.sendStatus(404);
        });
}
