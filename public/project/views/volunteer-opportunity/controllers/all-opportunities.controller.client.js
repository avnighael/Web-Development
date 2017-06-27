(function () {
    angular
        .module('Handouts')
        .controller('allOpportunityController', allOpportunityController);

    function allOpportunityController(currentUser, opportunityService, userService, $routeParams) {

        var model = this;

        model.currentUser = currentUser;
        var projectId = $routeParams.projectId;
        model.projectId = projectId;

        if($routeParams.userId) {
            var thisUserId = $routeParams.userId;
            model.thisUserId = thisUserId;
        }


        model.getAllOpportunities = getAllOpportunities;
        model.addVolunteer = addVolunteer;


        function init() {

                getAllOpportunities();


        }

        init();


        function addVolunteer(opportunityId) {
            userService
                .findUserById(thisUserId)
                .then(function (user) {
                    opportunityService.
                    addVolunteer(user, opportunityId)
                        .then(function (response) {
                            model.message = "Volunteer Added"
                        }, function (err) {
                            model.error = "Something went wrong!"
                        })
                }, function (err) {
                    console.log(err);
                })

        }

        function getAllOpportunities() {
            opportunityService
                .getAllOpportunities()
                .then(function (opportunities) {
                    model.opportunities = opportunities;
                }, function () {
                    model.error = "Uh Oh! Something went wrong."
                });
        }

        function deleteOpportunity(opportunityId) {
            opportunityService
                .deleteOpportunity(opportunityId)
                .then(function (response) {
                    console.log(response);
                    getAllOpportunities(model.currentUser._id);
                }, function () {
                    model.error = "Something went wrong. Opportunity deletion unsuccessfull!"
                });
        }

        function getAllOpportunitiesById(createdBy) {
            opportunityService
                .getAllOpportunitiesById(createdBy)
                .then(function (opportunities) {
                    model.opportunities = opportunities;
                }, function () {
                    model.error = "Uh Oh! Something went wrong."
                });
        }





    }
})();