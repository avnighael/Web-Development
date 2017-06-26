var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var bcrypt = require("bcrypt-nodejs");

app.get('/api/project/donors', isAdmin, getAllDonors);
app.delete('/api/project/admin/user/:userId/delete', isAdmin, deleteUser);
app.post('/api/project/admin/user/create', isAdmin, createUser);
app.get('/api/project/user/:userId', isAdmin, getUserById);
app.put('/api/project/user/:userId/edit', isAdmin, modifyUser);
app.put("/api/project/admin/user/:thisUserId/unfollow/:usernameToUnfollow", isAdmin, unfollow);

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
