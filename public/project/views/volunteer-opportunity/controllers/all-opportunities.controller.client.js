(function () {
    angular
        .module('Handouts')
        .controller('allOpportunityController', allOpportunityController);

    function allOpportunityController(currentUser, opportunityService, $routeParams) {

        var model = this;

        model.currentUser = currentUser;
        var projectId = $routeParams.projectId;
        model.projectId = projectId;

        model.trust = trust;
        model.getTrsustedURL = getTrsustedURL;
        model.getAllOpportunities = getAllOpportunities;
        model.deleteOpportunity = deleteOpportunity;
        model.getAllOpportunitiesById = getAllOpportunitiesById;

        function init() {
            if(model.currentUser.role === "ORGANIZATION") {
                getAllOpportunitiesById(model.currentUser._id);
            } else if(model.currentUser.role === "DONOR") {
                getAllOpportunities();
            }
        }

        init();

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

        function trust(html) {
            return $sce.trustAsHtml(html);

        }

        function getTrsustedURL (url) {
            return  $sce.trustAsResourceUrl(url);
        }




    }
})();