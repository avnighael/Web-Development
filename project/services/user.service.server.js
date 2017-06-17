var app = require('../../express');
var userModel = require('../models/user/user.model.server');

app.get('/api/project/user/:userId',findUserById);
app.get('/api/project/user',findUser);
app.post('/api/project/user',createUser);
app.put('/api/project/user/:userId',updateUser);
app.delete('/api/project/user/:userId',deleteUser);
app.put('/api/project/user/:userId/project/:projectId', addToWishList);
app.delete('/api/project/user/:userId/project/:projectId', removeFromWishList);
app.get('/api/project/user/:userId/project/:projectId', findUserWishListProjectById);
app.get('/api/project/user/:userId/wishlist', getWishList);
// app.post('/api/project/user/:userId/project/:projectId/donate', sendDonation);

function sendDonation(req, res) {
    var userId = req.params.userId;
    var projectId = req.params.projectId;
    var amount = req.body;
    console.log(amount);

//console.log(userId);
    userModel
        .sendDonation(userId)
        .then(function (response) {
            console.log(response);
            res.json(response);
        },function (err) {
            res.sendStatus(404);
        });
}

function getWishList(req, res) {
    var userId = req.params.userId;
//console.log(userId);
    userModel
        .getWishList(userId)
        .then(function (response) {
            res.json(response);
        },function (err) {
            res.sendStatus(404);
        });
}

function findUserWishListProjectById(req, res) {
    var userId = req.params.userId;
    var projectId = req.params.projectId;

    userModel
        .findUserWishListProjectById(userId, projectId)
        .then(function (response) {
            // console.log(response);
            if(response == undefined) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }

        },function (err) {
            res.sendStatus(404);
        });
}

function removeFromWishList(req, res) {
    var userId = req.params.userId;
    var projectId = req.params.projectId;

    userModel
        .removeFromWishList(userId, projectId)
        .then(function (response) {
            res.json(response);
        },function (err) {
            res.sendStatus(404);
        });
}

function addToWishList(req, res) {
    var userId      = req.params.userId;
    var projectId   = req.params.projectId;
    var project = req.body;

    userModel
        .addToWishList(userId, projectId, project)
        .then(function (response) {
            res.json(response);
        },function (err) {
            res.send(err);
        });
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

    // for(var u in users) {
    //     if(users[u]._id === userId) {
    //         users.splice(u, 1);
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function updateUser(req, res) {
    var userId = req.params['userId'];
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

    // var newUser = req.body;
    // newUser._id = (new Date()).getTime() + "";
    // users.push(newUser);
    // res.json(newUser);
}

// function findAllUsers(req, res) {
//     var username = req.query['username'];
//     var password = req.query.password;
//     if(username && password) {
//         for(var u in users) {
//             var user = users[u];
//             if( user.username === username &&
//                 user.password === password) {
//                 res.json(user);
//                 return;
//             }
//         }
//         res.sendStatus(404);
//         return;
//     } else if(username) {
//         for(var u in users) {
//             var user = users[u];
//             if( user.username === username) {
//                 res.json(user);
//                 return;
//             }
//         }
//         res.sendStatus(404);
//         return;
//     } else {
//         res.json(users);
//     }
// }

function findUserById(req, res) {
    var userId = req.params['userId'];

    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json((user));
        });



    // for(var u in users) {
    //     if(users[u]._id === userId) {
    //         res.json(users[u]) ;
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}