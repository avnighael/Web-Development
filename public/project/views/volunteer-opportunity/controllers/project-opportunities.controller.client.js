(function () {
    angular
        .module('Handouts')
        .controller('projectOpportunitiesController', projectOpportunitiesController);

    function projectOpportunitiesController(currentUser, opportunityService, $routeParams) {

        var model = this;

        model.currentUser = currentUser;
        var projectId = $routeParams.projectId;
        model.projectId = projectId;

        model.getOpportunitiesByProjectId = getOpportunitiesByProjectId;
        model.addVolunteer = addVolunteer;
        model.deleteVolunteer = deleteVolunteer;


        function init() {
            getOpportunitiesByProjectId(projectId);
        }

        init();

        function deleteVolunteer(opportunityId) {
            opportunityService
                .deleteVolunteer(model.currentUser._id, opportunityId)
                .then(function (response) {
                    getOpportunitiesByProjectId(projectId);
                }, function (err) {
                    console.log(err);
                })
        }

        function addVolunteer(opportunityId) {
            opportunityService.
            addVolunteer(model.currentUser, opportunityId)
                .then(function (response) {
                    model.message = "Congratulations! you are a part of our team now."
                }, function (err) {
                    model.error = "Something went wrong!"
                })
        }

        function getOpportunitiesByProjectId(projectId) {
            opportunityService
                .getOpportunitiesByProjectId(projectId)
                .then(function (opportunities) {
                     // console.log(opportunities);
                    model.opportunities = opportunities;

                }, function (err) {
                    console.log(err);
                })
        }


    }
})();