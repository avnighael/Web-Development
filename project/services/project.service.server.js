var app = require('../../express');
var projectModel = require('../models/project/project.model.server');

app.post("/api/project/donate", createProject);

function createProject(req, res) {
    var project = req.body;
    //var projectId = req.params.projectId;

    projectModel
        .createProject(userId, website)
        .then(function (website) {
            res.json(website);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

