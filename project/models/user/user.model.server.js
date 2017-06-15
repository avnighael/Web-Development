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

module.exports = userModel;

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}
 
function findAllUser() {
    return userModel.find();
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(username,password) {
    return userModel.findOne({username: username, password: password});
}

function updateUser(userId, newUser) {
    delete newUser.username;
    return userModel.update({_id: userId},
        {$set: {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone
        }
        });
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function findUserWishListProjectById(userId, projId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            // console.log(user.projects.projectId);
            return userModel
                .find({projects: {$elemMatch: {projectId: projId}}})
                .then(function (user) {
                    return user[0];
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