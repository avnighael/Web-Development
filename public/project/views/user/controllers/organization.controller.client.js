(function () {
    angular
        .module("Handouts")
        .controller("organizationController", organizationController);

    function organizationController(orgService, $location, $routeParams) {

        var model = this;

        var userId = $routeParams.userId;
        model.userId = userId;
        var organizationId = $routeParams.organizationId;
        model.organizationId = organizationId;

        //model.projectDetail = projectDetail;

        function init() {
            orgService
                .getOrganizationDetailsById(organizationId)
                .then(renderOrganization);
        }

        init();

        function renderOrganization(org) {
            model.org = org.data.organization;

        }



    }
})();