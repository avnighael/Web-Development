var app = require('../../express');
var websiteModel = require('../models/website/website.model.server');

app.get('/api/assignment/user/:userId/website',findWebsitesByUser);
app.post("/api/assignment/user/:userId/website",createWebsite);
app.get("/api/assignment/website/:websiteId",findWebsiteById);
app.put("/api/assignment/website/:websiteId",updateWebsite);
app.delete("/api/assignment/website/:websiteId",deleteWebsite);

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;

    websiteModel
        .deleteWebsite(websiteId)
        .then(
            function (status) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(404);
            });

}

function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var newWebsite = req.body;

    websiteModel.updateWebsite(websiteId, newWebsite)
        .then(function (website, err) {
            if (website) {
                res.json(website);
            } else {
                res.sendStatus(404).send(err);
            }
        });
}

function findWebsiteById(req,res) {
    var websiteId = req.params.websiteId;

    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            res.send(website);
        }, function (err) {
            res.sendStatus(404);
        });
}

function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params.userId;

    website.lastAccessed = new Date();

    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function (website) {
            res.json(website);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findWebsitesByUser(req,res) {
    websiteModel.
        findWebsitesByUser(req.params.userId)
        .then(function (websites) {
            res.json(websites);
        });
}
