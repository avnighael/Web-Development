(function () {
    angular
        .module('Handouts')
        .controller('organizationAllOpportunityController', organizationAllOpportunityController);

    function organizationAllOpportunityController(currentUser, userService, opportunityService, $location, $routeParams) {

        var model = this;

        model.currentUser = currentUser;
        var projectId = $routeParams.projectId;
        model.projectId = projectId;

        model.trust = trust;
        model.getTrsustedURL = getTrsustedURL;
        model.getAllOpportunities = getAllOpportunities;
        model.deleteOpportunity = deleteOpportunity;
        model.getAllOpportunitiesById = getAllOpportunitiesById;
        model.getOpportunitiesOfDonor = getOpportunitiesOfDonor;
        model.logout = logout;

        function init() {
            if(model.currentUser) {
                if(model.currentUser.role === "ORGANIZATION") {
                    getAllOpportunitiesById(model.currentUser._id);
                } else if(model.currentUser.role === "DONOR") {
                    getOpportunitiesOfDonor(model.currentUser._id);
                }
            } else {
                getAllOpportunities();
            }

        }

        init();

        function logout(user){
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                })
        }

        function getOpportunitiesOfDonor(donorId) {
            opportunityService
                .getOpportunitiesOfDonor(donorId)
                .then(function (opportunities) {
                    model.opportunities = opportunities;
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
                    // console.log(response);
                    getAllOpportunitiesById(model.currentUser._id);
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