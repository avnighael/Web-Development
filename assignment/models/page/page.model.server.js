var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server.js');
var pageModel = mongoose.model('pageModel', pageSchema);

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget;

module.exports = pageModel;

function deletePage(pageId) {
    return pageModel.remove({_id: pageId});
}

function updatePage(pageId, newPage) {
    return pageModel.update({_id: pageId},
        {$set: {
            name : newPage.name,
            title : newPage.title,
            description: newPage.description
        }
        });
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function findAllPagesForWebsite(websiteId) {
    return pageModel.find({_website:websiteId});
}

function createPage(websiteId, page) {
    page._website=websiteId;

    return pageModel.create(page);
}

function addWidget(pageId, widgetId) {
    return pageModel.findById({_id:pageId},
        function (err,page) {
            page.widgets.push(widgetId);
            page.save();
        });
}

// function deleteWebsite(websiteId) {
//     return websiteModel.remove({_id: websiteId});
// }
//
// function findWebsiteById(websiteId) {
//     return websiteModel.findById(websiteId);
// }
//
// function updateWebsite(websiteId, newWebsite) {
//     return websiteModel.update({_id: websiteId},
//         {$set: {
//             name : newWebsite.name,
//             description : newWebsite.description,
//             lastAccessed: new Date()
//         }
//         });
//
// }
//
// function findWebsitesByUser(userId) {
//     return websiteModel
//         .find({_user: userId})
//         .populate('_user')
//         .exec();
// }
//
// function createWebsiteForUser(userId, website) {
//     website._user = userId;
//     return websiteModel.create(website);
// }
