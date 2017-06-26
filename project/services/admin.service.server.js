var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var donationModel = require('../models/donation/donation.model.server');
var commentModel = require('../models/comment/comment.model.sever');
var opportunityModel = require('../models/opportunity/opportunity.model.server');
var bcrypt = require("bcrypt-nodejs");

app.get('/api/project/donors', isAdmin, getAllDonors);
app.get('/api/project/users', isAdmin, getAllUsers);
app.delete('/api/project/admin/user/:userId/delete', isAdmin, deleteUser);
app.post('/api/project/admin/user/create', isAdmin, createUser);
app.get('/api/project/user/:userId', isAdmin, getUserById);
app.put('/api/project/user/:userId/edit', isAdmin, modifyUser);
app.put("/api/project/admin/user/:thisUserId/unfollow/:usernameToUnfollow", isAdmin, unfollow);
app.get("/api/project/admin/user/:userId/getDonations", isAdmin, getDonationHistory);
app.delete("/api/project/admin/:donationId/delete", isAdmin, deleteDonation);
app.get("/api/project/admin/user/:userId/getComments", isAdmin, getComments);
app.delete("/api/project/admin/comment/:commentId/delete", isAdmin, deleteComment);
app.get("/api/project/admin/donor/:donorId/getOpportunities", isAdmin, getOpportunitiesOfDonor);

function getOpportunitiesOfDonor(req, res) {
    var donorId = req.params.donorId;

    opportunityModel
        .getOpportunitiesOfDonor(donorId)
        .then(function (response) {
            res.json(response);
        },function (err) {
            res.send(err);
        });
}

function deleteComment(req, res) {
    var commentId = req.params.commentId;

    commentModel
        .deleteComment(commentId)
        .then(function (response) {
            res.json(response);
        },function (err) {
            res.send(err);
        });
}

function getComments(req, res) {
    var userId = req.params.userId;

    commentModel
        .getComments(userId)
        .then(function (response) {
            res.json(response);
        },function (err) {
            res.send(err);
        });
}

function deleteDonation(req, res) {
    var donationId = req.params.donationId;

    donationModel
        .deleteDonation(donationId)
        .then(function (response) {
            res.json(response);
        },function (err) {
            res.send(err);
        });
}

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

function unfollow(req, res) {
    var userId = req.params.thisUserId;
    var usernameToUnfollow = req.params.usernameToUnfollow;

    userModel
        .unfollowPersonByUsername(usernameToUnfollow, userId)
        .then(function (response) {
            res.json(response);
        },function (err) {
            res.send(err);
        });
}


function modifyUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);

    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function getUserById(req, res) {
    var userId = req.params.userId;

    userModel
        .findUserById(userId)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function createUser(req, res) {
    var newUser = req.body;
    newUser.password = bcrypt.hashSync(newUser.password);

    userModel
        .createUser(newUser)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function deleteUser(req, res) {
    var userId = req.params['userId'];

    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function getAllDonors(req, res) {
    if(req.user && req.user.role ==='ADMIN')
    {
        userModel
            .getAllDonors()
            .then(
                function(users){
                    console.log(users);
                    res.json(users);
                },
                function(err){
                    res.send(400);
                }
            );
    }
    else
    {
        res.send(401);
    }
}

function getAllUsers(req, res) {
    if(req.user && req.user.role ==='ADMIN')
    {
        userModel
            .getAllUsers()
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.send(400);
                }
            );
    }
    else
    {
        res.send(401);
    }
}

function isAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.role.indexOf('ADMIN') > -1) {
        next();
    } else {
        res.sendStatus(401);
    }
}
