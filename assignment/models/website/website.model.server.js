var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server.js');
var websiteModel = mongoose.model('websiteModel', websiteSchema);

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findWebsitesByUser = findWebsitesByUser;
websiteModel.updateWebsite = updateWebsite;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.addPage = addPage;

module.exports = websiteModel;

function deleteWebsite(websiteId) {
    return websiteModel.remove({_id: websiteId});
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
    return websiteModel.create(website);
}

function addPage(websiteId, pageId) {
    return websiteModel
        .findById({_id:websiteId},
            function (err, website) {
            website.pages.push(pageId);
            website.save();
        });
};
