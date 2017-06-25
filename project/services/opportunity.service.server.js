var app = require('../../express');
var opportunityModel = require('../models/opportunity/opportunity.model.server');

app.post("/api/project/:projectId/opportunity", createOpportunity);
app.get("/api/project/opportunity/:opportunityId", getOpportunityById);
app.put("/api/project/opportunity/:opportunityId", updateOpportunity);
app.delete("/api/project/opportunity/:opportunityId", deleteOpportunity);
app.get("/api/project/allOpportunities", getAllOpportunities);
app.get("/api/project/allOpportunities/:createdBy", getAllOpportunitiesById);
app.post("/api/project/opportunity/:opportunityId/volunteer", addVolunteer);

function addVolunteer(req, res) {
    var opportunityId = req.params.opportunityId;
    var volunteerId = req.body._id;

    opportunityModel
        .addVolunteer(volunteerId, opportunityId)
        .then(function (opp) {
            res.json(opp)
        }, function (err) {
            res.send(err);
        });
}

function getAllOpportunitiesById(req, res) {
    var createdBy = req.params.createdBy;

    opportunityModel
        .getAllOpportunitiesById(createdBy)
        .then(function (opp) {
            res.json(opp)
        }, function (err) {
            res.send(err);
        });
}

function getAllOpportunities(req, res) {
    opportunityModel
        .getAllOpportunities()
        .then(function (opp) {
            res.json(opp)
        }, function (err) {
            res.send(err);
        });
}

function deleteOpportunity(req, res) {
    var opportunityId = req.params.opportunityId;

    opportunityModel
        .deleteOpportunity(opportunityId)
        .then(function (opp) {
            res.json(opp)
        }, function (err) {
            res.send(err);
        });
}

function updateOpportunity(req, res) {
    var opportunityId = req.params.opportunityId;
    var opportunity = req.body;

    opportunityModel
        .updateOpportunity(opportunityId, opportunity)
        .then(function (opp) {
            res.json(opp)
        }, function (err) {
            res.send(err);
        });
}

function getOpportunityById(req, res) {
    var opportunityId = req.params.opportunityId;

    opportunityModel
        .getOpportunityById(opportunityId)
        .then(function (opp) {
            res.json(opp)
        }, function (err) {
            res.send(err);
        });
}

function createOpportunity(req, res) {
    var projectId = req.params.projectId;
    var newOpportunity = req.body;

    opportunityModel
        .createOpportunity(newOpportunity, projectId)
        .then(function (opp) {
            res.json(opp)
        }, function (err) {
            res.send(err);
        });
}
