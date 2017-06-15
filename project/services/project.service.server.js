var app = require('../../express');
var projectModel = require('../models/project/project.model.server');

// app.get('/api/assignment/user/:userId/website',findWebsitesByUser);
app.post("/api/project/donate",createProject);
// app.get("/api/assignment/website/:websiteId",findWebsiteById);
// app.put("/api/assignment/website/:websiteId",updateWebsite);
// app.delete("/api/assignment/website/:websiteId",deleteWebsite);



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

