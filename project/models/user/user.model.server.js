var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('userModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUser = findAllUser;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addToWishList = addToWishList;
userModel.removeFromWishList = removeFromWishList;
userModel.findUserWishListProjectById = findUserWishListProjectById;
userModel.getWishList = getWishList;
userModel.followPerson = followPerson;
userModel.unfollowPerson = unfollowPerson;
userModel.addToFavourites = addToFavourites;
userModel.removeFromFavourites = removeFromFavourites;

userModel.findUserByGoogleId = findUserByGoogleId;
userModel.findUserByFacebookId = findUserByFacebookId;

module.exports = userModel;


function followPerson(userIdToFollow, userId) {
    return userModel
        .findOne({_id:userId})
        .then(function (user) {
            user.following.push(userIdToFollow);
            user.save();
            return userModel
                .findOne({_id:userIdToFollow})
                .then(function (followedUser) {
                    followedUser.followers.push(userId);
                    followedUser.save();
                    return user;
                },function (err) {
                    return err;
                });
        },function (err) {
            return err;
        });
}

function unfollowPerson(userIdToUnfollow, userId) {
    return userModel
        .findOne({_id:userId})
        .then(function (user) {
            user.following.splice(user.following.indexOf(userIdToUnfollow),1);
            user.save();
            return userModel
                .findOne({_id:userIdToUnfollow})
                .then(function (followedUser) {
                    followedUser.followers.splice(followedUser.followers.indexOf(userId),1);
                    followedUser.save();
                    return user;
                },function (err) {
                    return err;
                });
        },function (err) {
            return err;
        });
}

function createUser(user) {
    if(user.role) {
        user.role = user.role.split(',');
        console.log(user.role);

    } else if(user.organization){
        user.role = ['ORGANIZATION'];
    } else {
        user.role = ['DONOR'];
    }

    return userModel.create(user);
}

function findUserById(userId) {
    return userModel
        .findById(userId)
        .populate('followers', 'firstName lastName')
        .populate('following', 'firstName lastName')
        .exec()
        // .then(function (user) {
        //     // console.log(user);
        //     return user;
        // })
}
 
function findAllUser() {
    return userModel.find();
}

function findUserByUsername(username) {
    return userModel
        .findOne({username: username})
        .then(function (user) {
            console.log(user);
            return user;
        });
}

function findUserByCredentials(username,password) {
    return userModel.findOne({username: username, password: password});
}

function updateUser(userId, newUser) {
    delete newUser.username;

    if(typeof newUser.role === 'string') {
        newUser.role = newUser.role.split(',');
    }

    return userModel.update({_id: userId},
        {$set: {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone,
            role: newUser.role,
            password: newUser.password
        }
        });
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function getWishList(userId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            // console.log(user.projects);
            return user.projects;
        }, function (err) {
            return err;
        });
}

function findUserWishListProjectById(userId, projId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            // console.log(user.projects.projectId);
            return userModel
                .find({projects: {$elemMatch: {projectId: projId}}})
                .then(function (user) {
                     // console.log(user[0].projects);
                      var projects = user[0].projects;

                      for(var p in projects) {
                          if(projects[p].projectId === projId) {
                               return projects[p]._id;
                              // console.log(projects[p].id);
                          }
                      }

                    // return user[0];
                }, function (err) {
                    return err;
                })
        }, function (err) {
            return err;
        });
}

function removeFromWishList(userId, projectId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.projects.splice(user.projects.indexOf(projectId),1);
            return user.save();
        },function (err) {
            return err;
        })
}

function addToWishList(userId, projectId, proj) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var projD = {projectId: projectId,
                title: proj.title,
                organization: proj.organization.name,
                country: proj.country,
                causeName: proj.themeName,
                imageLink: proj.imageLink};
            user.projects.push(projD);
            return user.save();
            // return user;
        },function (err) {
            return err;
        })
}

function removeFromFavourites(userId, projectId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.favourites.splice(user.projects.indexOf(projectId),1);
            return user.save();
        },function (err) {
            return err;
        })
}

function addToFavourites(userId, projectId, proj) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var projD = {projectId: projectId,
                title: proj.title,
                organization: proj.organization.name,
                country: proj.country,
                causeName: proj.themeName,
                imageLink: proj.imageLink};
            user.favourites.push(projD);
            return user.save();
            // return user;
        },function (err) {
            return err;
        })
}

function findUserByGoogleId(googleId) {
    return userModel
        .findOne({'google.id': googleId});
}

function findUserByFacebookId(facebookId) {
    return userModel
        .findOne({'facebook.id': facebookId});
}