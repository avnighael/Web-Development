var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.post('/api/assignment/login', passport.authenticate('local'), login);
app.get('/api/assignment/user/:userId',findUserById);
app.get('/api/assignment/user/',isAdmin,findAllUsers);
// app.get('/api/assignment/user',findUser);
app.post('/api/assignment/user',isAdmin, createUser);
app.put('/api/assignment/admin/user/:userId', isAdmin, updateUser);
app.put('/api/assignment/user/:userId',passport.authenticate('local'), modifyUser);
app.delete('/api/assignment/user/:userId',isAdmin, deleteUser);
app.get('/api/assignment/checkLoggedIn',checkLoggedIn );
app.get('/api/assignment/checkAdmin',checkAdmin);
app.post('/api/assignment/logout', logout);
app.post('/api/assignment/register', register);
app.post('/api/assignment/unregister', unregister);

function unregister(req, res) {
    var userId = req.body._id;
    userModel
        .deleteUser(userId)
        .then(function (user) {
            req.logout();
            res.sendStatus(200);
        });
}

function isAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        next();
    } else {
        res.sendStatus(401);
    }
}

function checkAdmin(req, res) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function register(req, res) {
    var newUser = req.body;
    userModel
        .createUser(newUser)
        .then(function (user) {
            req
                .login(user, function (status) {
                    res.sendStatus(200);
                });
        })
}

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function checkLoggedIn(req, res) {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function findUser(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    if(username && password) {
        findUserByCredentials(req, res);
    } else if(username) {
        findUserByUsername(req, res);
    }
}

function findUserByUsername(req, res) {
    var username = req.query.username;

    userModel
        .findUserByUsername(username)
        .then(function (user) {
            console.log("Success");
            res.json(user);
        }, function (err) {
            console.log("Failed");
            res.sendStatus(404);
        });
}

function findUserByCredentials(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    userModel
        .findUserByCredentials(username,password)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
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

function updateUser(req, res) {
    var userId = req.params['userId'];
    var user = req.body;
    console.log(user);
    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function modifyUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;

    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function createUser(req,res) {
    var newUser = req.body;
    userModel
        .createUser(newUser)
        .then(function (newUser) {
            res.json(newUser)
        }, function (err) {
            res.send(err);
        });
}

function findAllUsers(req, res) {
    var username = req.query['username'];
    var password = req.query.password;
    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else if(username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            });
    }
}

function findUserById(req, res) {
    var userId = req.params['userId'];

    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json((user));
        });

}

function serializeUser(user, done) {
    done(null, user);
}
function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}