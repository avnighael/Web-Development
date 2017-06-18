var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
// passport.use(new LocalStrategy(localChecking));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);


var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleConfig = {
    // clientID     : GOOGLE_CLIENT_ID,
    // clientSecret : GOOGLE_CLIENT_SECRET,
    // callbackURL  : GOOGLE_CALLBACK_URL
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};

var FacebookStrategy = require('passport-facebook').Strategy;
var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
};


passport.use(new GoogleStrategy(googleConfig, googleStrategy));
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

var bcrypt = require("bcrypt-nodejs");

app.post('/api/assignment/login', passport.authenticate('local'), login);
app.get('/api/assignment/user/:userId',findUserById);
app.get('/api/assignment/users/',isAdmin,findAllUsers);
app.get('/api/assignment/user',findUserByUsername);
app.post('/api/assignment/user',isAdmin, createUser);
app.put('/api/assignment/admin/user/:userId', isAdmin, updateUser);
app.put('/api/assignment/user/:userId', modifyUser);
app.delete('/api/assignment/user/:userId',isAdmin, deleteUser);
app.get('/api/assignment/checkLoggedIn',checkLoggedIn );
app.get('/api/assignment/checkAdmin',checkAdmin);
app.post('/api/assignment/logout', logout);
app.post('/api/assignment/register', register);
app.post('/api/assignment/unregister', unregister);

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/assignment/#/profile',
        failureRedirect: '/assignment/#/login'
    }));

app.get ('/auth/facebook', passport.authenticate('facebook', { scope : ['profile', 'email'] }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/assignment/#/profile',
        failureRedirect: '/assignment/#/login'
    }));


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
    // newUser.password = bcrypt.hashSync(newUser.password);
    // console.log(newUser);
    // userModel
    //     .findUserByUsername(newUser.username)
    //     .then(function (status) {
    //         res.sendStatus(300);
    //     })

    userModel
        .createUser(newUser)
        .then(function(user){
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            }, function (err) {
                // console.log(err);
                return err;
        });

}

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                // if (user && bcrypt.compareSync(password, user.password)) {
                //     return done(null, user);
                // } else {
                //     return done(null, false);
                // }
                return done(null, user);
            },
            function(err) {
                if (err) {
                    return done(err);
                }
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
        }, function (err) {
            return err;
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

function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
}

function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(
            function (facebookUser) {
                if (facebookUser) {
                    return done(null, facebookUser);
                }
                else {
                    var facebookUser = {
                        firstName: profile.displayName.split(' ')[0],
                        lastName: profile.displayName.split(' ')[1],
                        facebook: {
                            token: token,
                            id: profile.id
                        }
                    };
                    userModel
                        .createUser(facebookUser)
                        .then(function (user) {
                            done(null, user)
                        }, function (err) {
                            done(err, null)
                        });
                }
            },
            function (err) {
                done(err, null);
            });
}