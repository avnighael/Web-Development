var app = require('../../express');
var pageModel = require('../models/page/page.model.server');

app.get("/api/assignment/website/:websiteId/page",findPageByWebsiteId);
app.get("/api/assignment/page/:pageId",findPageById);
app.post("/api/assignment/website/:websiteId/page",createPage);
app.put("/api/assignment/page/:pageId", updatePage);
app.delete("/api/assignment/page/:pageId", deletePage);


function deletePage(req, res) {
    var pageId = req.params.pageId;

    pageModel.deletePage(pageId)
        .then(function (page, err) {
            if (page) {
                res.json(page);
            } else {
                res.sendStatus(404).send(err);
            }
        });
}

function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;

    pageModel.updatePage(pageId, page)
        .then(function (page,err) {
            if(page) {
                res.json(page);
            } else {
                res.sendStatus(404).send(err);
            }
        });
}

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;

    pageModel
        .createPage(websiteId,page)
        .then(function(page){
            res.json(page);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findPageById(req, res) {
    var pageId = req.params.pageId;

    pageModel
        .findPageById(pageId)
        .then(function(page){
            res.json(page);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findPageByWebsiteId(req, res) {
    var websiteId = req.params.websiteId;

    pageModel.findAllPagesForWebsite(websiteId)
        .then(function (page,err) {
                if(page) {
                    res.json(page);
                } else {
                    res.sendStatus(404).send(err);
                }
            });

    // for(var p in pages) {
    //     if(pages[p].websiteId === websiteId) {
    //         result.push(pages[p]);
    //     }
    // }
    // res.json(result);

}
