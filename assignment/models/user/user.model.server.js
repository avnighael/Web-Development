var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('userModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUsers = findAllUsers;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;

userModel.findUserByGoogleId = findUserByGoogleId;
userModel.findUserByFacebookId = findUserByFacebookId;

    module.exports = userModel;

function createUser(user) {
    if(user.roles) {
        user.roles = user.roles.split(',');
    } else {
        user.roles = ['USER'];
    }

    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}
 
function findAllUsers() {
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

    if(typeof newUser.roles === 'string') {
        newUser.roles = newUser.roles.split(',');
    }

    return userModel.update({_id: userId},
        {$set: {
            userName: newUser.username,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone,
            roles: newUser.roles
        }
        });
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function findUserByGoogleId(googleId) {
    return userModel
        .findOne({'google.id': googleId});
}

function findUserByFacebookId(facebookId) {
    return userModel
        .findOne({'facebook.id': facebookId});
}
