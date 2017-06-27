var mongoose = require('mongoose');
var opportunitySchema = require('./opportunity.schema.server');
var opportunityModel = mongoose.model('opportunityModel', opportunitySchema);

opportunityModel.createOpportunity = createOpportunity;
opportunityModel.getOpportunityById = getOpportunityById;
opportunityModel.updateOpportunity = updateOpportunity;
opportunityModel.deleteOpportunity = deleteOpportunity;
opportunityModel.getAllOpportunities = getAllOpportunities;
opportunityModel.getAllOpportunitiesById = getAllOpportunitiesById;
opportunityModel.addVolunteer = addVolunteer;
opportunityModel.deleteVolunteer = deleteVolunteer;
opportunityModel.getOpportunitiesOfDonor = getOpportunitiesOfDonor;
opportunityModel.getOpportunitiesByProjectId = getOpportunitiesByProjectId;

module.exports = opportunityModel;

function getOpportunitiesByProjectId(projectId) {
    return opportunityModel
        .find({projectId: projectId})
        .populate('_createdBy', 'username organization')
        .exec()
}

function getOpportunitiesOfDonor(donorId) {
    return opportunityModel
        .find({_volunteers: donorId})
        .populate('_createdBy', 'username organization')
        .exec()
}

function deleteVolunteer(volunteerId, opportunityId) {
    return opportunityModel
        .findById(opportunityId)
        .then(function (opportunity) {
            opportunity._volunteers.splice(opportunity._volunteers.indexOf(volunteerId),1);
            opportunity.save();
        }, function (err) {
            return err;
        })
}

function addVolunteer(volunteerId, opportunityId) {
    return opportunityModel
        .findById(opportunityId)
        .then(function (opportunity) {
            opportunity._volunteers.push(volunteerId);
            return opportunity.save();
        });
}

function getAllOpportunitiesById(createdBy) {
    return opportunityModel
        .find({_createdBy: createdBy})
        .populate('_volunteers', 'username')
        .exec()
}

function getAllOpportunities() {
    return opportunityModel.find();
}

function deleteOpportunity(opportunityId) {
    return opportunityModel.remove({_id: opportunityId});
}

function updateOpportunity(opportunityId, opportunity) {
    return opportunityModel.update({_id: opportunityId},
        {$set: {
            title: opportunity.title,
            description: opportunity.description,
            skills: opportunity.skills,
            commitment: opportunity.commitment,
            startDate: opportunity.startDate,
            endDate : opportunity.endDate,
            location: opportunity.location,
            longitude : opportunity.longitude,
            latitude : opportunity.latitude,
            imageUrl : opportunity.imageUrl
        }
        });
}

function getOpportunityById(opportunityId) {
    return opportunityModel
        .findById(opportunityId);
}

function createOpportunity(opportunity, projectId) {
    // console.log(opportunity);
    opportunity.projectId = projectId;
    return opportunityModel.create(opportunity);
}
