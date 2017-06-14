(function () {
    angular
        .module("Handouts")
        .controller("browseOrganizationController", browseOrganizationController);

    function browseOrganizationController(orgService, $location, $routeParams) {

        var model = this;

        var userId = $routeParams.userId;
        model.userId = userId;

        model.getOrganization = getOrganization;

        function init() {
            getOrganization();
            // orgService
            //     .authenticateAPI()
            //     .then(function (response) {
            //         model.auth = response;
            //     })
        }

        init();


        function getOrganization() {
            orgService
                .getOrganization()
                .then(function (orgs) {
                    //model.orgs = orgs.charities.charity;
                    model.orgs = orgs.data.organizations.organization;
                });
        }

    }
})();