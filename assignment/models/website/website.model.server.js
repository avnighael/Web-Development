var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server.js');
var websiteModel = mongoose.model('websiteModel', websiteSchema);
var userModel = require('../user/user.model.server');
var model = null;

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findWebsitesByUser = findWebsitesByUser;
websiteModel.updateWebsite = updateWebsite;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.addPage = addPage;
websiteModel.deleteUserOfThisWebsite = deleteUserOfThisWebsite;

module.exports = websiteModel;

function deleteUserOfThisWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.websites.splice(user.websites.indexOf(websiteId),1);
            user.save();
            //console.log("websites");
            //console.log(website);
            return user;
            //return pageModel.deletePageFromWidget(page, pageId);
        });
}

function deleteWebsite(websiteId) {
    //return websiteModel.remove({_id: websiteId});
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            var userId = website._user[0];
            return websiteModel
                .deleteUserOfThisWebsite(userId, websiteId)
                .then(function () {
                    return websiteModel.remove({_id: websiteId});
                })
        });
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, newWebsite) {
    return websiteModel.update({_id: websiteId},
        {$set: {
            name : newWebsite.name,
            description : newWebsite.description,
            lastAccessed: new Date()
        }
        });

}

function findWebsitesByUser(userId) {
    return websiteModel
        .find({_user: userId})
        .populate('_user')
        .exec();
}

function createWebsiteForUser(userId, website) {
    website._user = userId;
    return websiteModel.create(website)
        .then(function (website) {
            return userModel
                .findUserById(userId)
                .then(function (user) {
                    website.user = user._id;
                    user.websites.push(website._id);
                    website.save();
                    user.save();
                    return website;
                }, function () {
                    return err;
                });
        }, function () {
            return err;
        });
}

function addPage(websiteId, pageId) {
    return websiteModel
        .findById({_id:websiteId},
            function (err, website) {
            website.pages.push(pageId);
            website.save();
        });
};
