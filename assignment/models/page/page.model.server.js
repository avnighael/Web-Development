var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server.js');
var pageModel = mongoose.model('pageModel', pageSchema);
var websiteModel = require('../website/website.model.server');
var widgetModel = require('../widget/widget.model.server');

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.deleteWebsiteOfThisPage = deleteWebsiteOfThisPage;
pageModel.deleteWidgetOfThisPage = deleteWidgetOfThisPage;

module.exports = pageModel;

function deleteWidgetOfThisPage(page, pageId) {
    if(page.widgets.length == 0) {
        return pageModel.remove({_id: pageId});
    } else {
        var widgetId = page.widgets[0];
        page.widgets.splice(page.widgets.indexOf(widgetId),1);
        page.save();
        widgetModel
            .findById(widgetId)
            .then(function (widget) {
                widget._page.splice(widget._page.indexOf(pageId));
                widget.save();
                return deleteWidgetOfThisPage(page,pageId);
            });

        // return widgetModel
        //     .deleteWidgetsOfPage()
    }

}

function deleteWebsiteOfThisPage(page, pageId, websiteId) {

    return websiteModel
            .findById(websiteId)
            .then(function (website) {
                //console.log(website);
                website.pages.splice(website.pages.indexOf(pageId),1);
                website.save();
                //console.log("websites");
                //console.log(website);
                return website;
                //return pageModel.deletePageFromWidget(page, pageId);
        });
}

function deletePage(pageId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var websiteId = page._website[0];
            return pageModel
                .deleteWebsiteOfThisPage(page, pageId, websiteId)
                .then(function () {
                    return pageModel.remove({_id: pageId});
                })
        });
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

    return pageModel.create(page)
        .then(function (page) {
            return websiteModel
                .findWebsiteById(websiteId)
                .then(function (website) {
                    //page._website = websiteId;
                    console.log(page._id)
                    website.pages.push(page._id);
                    page.save();
                    website.save();
                    return page;
                }, function () {
                    return err;
                });
        }, function () {
            return err;
        });
}


