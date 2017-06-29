(function () {
    angular
        .module('Handouts')
        .controller('volunteerOpportunityController', volunteerOpportunityController);

    function volunteerOpportunityController($location,
                                            currentUser,
                                            opportunityService,
                                            userService,
                                            $routeParams) {

        var model = this;

        model.currentUser = currentUser;
        var projectId = $routeParams.projectId;
        model.projectId = projectId;
        // model.volunteer = model.currentUser._id;

        if($routeParams.opportunityId) {
            var opportunityId = $routeParams.opportunityId;
            model.opportunityId = opportunityId;
        }

        if($routeParams.userId) {
            var thisUserId = $routeParams.userId;
            model.thisUserId = thisUserId;
            model.isAdmin = true;
        }


        model.createOpportunity = createOpportunity;
        model.getOpportunityById = getOpportunityById;
        model.updateOpportunity = updateOpportunity;
        model.deleteOpportunity = deleteOpportunity;
        model.addVolunteer = addVolunteer;
        model.deleteVolunteer = deleteVolunteer;
        model.logout = logout;

        function init() {
            model.volunteering = false;

            getOpportunityById(opportunityId);
            // console.log(model.opportunity);

        }

        init();

        function logout(user){
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                })
        }

        function deleteVolunteer(opportunityId) {
            opportunityService
                .deleteVolunteer(model.currentUser._id, opportunityId)
                .then(function (response) {
                    getOpportunityById(opportunityId);
                    model.volunteering = false;
                }, function (err) {
                    console.log(err);
                })
        }

        function addVolunteer() {
            opportunityService.
                addVolunteer(model.currentUser, opportunityId)
                    .then(function (response) {
                        model.message = "Congratulations! you are a part of our team now."
                    }, function (err) {
                        model.error = "Something went wrong!"
                    })
        }

        function deleteOpportunity() {
            opportunityService
                .deleteOpportunity(model.opportunityId)
                .then(function (response) {
                    $location.url('organization/projects');
                }, function () {
                    model.error = "Something went wrong. Opportunity deletion unsuccessfull!"
                });
        }

        function updateOpportunity() {
            if(model.opportunity.title === null || model.opportunity.title === '' || typeof model.opportunity.title === 'undefined') {
                model.error = 'Opportunity title is required';
                return;
            }

            if(model.opportunity.description === null || model.opportunity.description === '' || typeof model.opportunity.description === 'undefined') {
                model.error = 'Opportunity description is required';
                return;
            }

            if(model.opportunity.skills === null || model.opportunity.skills === '' || typeof model.opportunity.skills === 'undefined') {
                model.error = "Opportunity skills is required";
                return;
            }

            if(model.opportunity.commitment === null || model.opportunity.commitment === '' || typeof model.opportunity.commitment === 'undefined') {
                model.error = "Opportunity commitment is required";
                return;
            }

            if(model.opportunity.location === null || model.opportunity.location === '' || typeof model.opportunity.location === 'undefined') {
                model.error = "Opportunity location is required";
                return;
            }

            var startDate = new Date(model.opportunity.startDate);
            var endDate   = new Date(model.opportunity.endDate);
            var today = new Date();

            if (startDate > endDate){
                model.error= 'Start Date cannot occur after end Date';
                return;
            }
            else if (startDate < today || endDate < today) {
                model.error= "Start date or End Date cannot be before Current Date";
                return;
            }

            opportunityService
                .updateOpportunity(opportunityId, model.opportunity)
                .then(function (response) {
                    model.message = "Opportunity Successfully Updated!";
                    model.error = null;
                }, function (err) {
                    model.error = "Uh Oh! Something went wrong.";
                    model.message = null;
                });
        }

        function getOpportunityById(opportunityId) {
            opportunityService
                .getOpportunityById(opportunityId)
                .then(function (opp) {
                    model.opportunity = opp;
                    model.opportunity.startDate = new Date(model.opportunity.startDate);
                    model.opportunity.endDate = new Date(model.opportunity.endDate);
                    for (var o in model.opportunity._volunteers) {
                        if(model.opportunity._volunteers[o] === model.currentUser._id) {
                            model.volunteering = true;
                        }
                    }
                    // console.log(model.opportunity);
                })

        }


        function createOpportunity(opportunity) {

            if(opportunity.title === null || opportunity.title === '' || typeof opportunity.title === 'undefined') {
                model.error = 'Opportunity title is required';
                return;
            }

            if(opportunity.description === null || opportunity.description === '' || typeof opportunity.description === 'undefined') {
                model.error = 'Opportunity description is required';
                return;
            }

            if(opportunity.skills === null || opportunity.skills === '' || typeof opportunity.skills === 'undefined') {
                model.error = "Opportunity skills is required";
                return;
            }

            if(opportunity.commitment === null || opportunity.commitment === '' || typeof opportunity.commitment === 'undefined') {
                model.error = "Opportunity commitment is required";
                return;
            }

            if(opportunity.location === null || opportunity.location === '' || typeof opportunity.location === 'undefined') {
                model.error = "Opportunity location is required";
                return;
            }


            if(thisUserId) {
                model.opportunity._createdBy = model.thisUserId;
            } else {
                model.opportunity._createdBy = model.currentUser._id;
            }
            console.log(opportunity);
            opportunityService
                .createOpportunity(opportunity, projectId)
                .then(function () {
                    if(thisUserId) {
                        $location.url("/admin/user/"+model.thisUserId+"/details");
                    } else {
                        $location.url("/organization/opportunity/all");
                    }
                });
        }
    }
})();