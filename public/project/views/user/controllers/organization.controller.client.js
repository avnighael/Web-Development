(function () {
    angular
        .module("Handouts")
        .controller("organizationController", organizationController);

    function organizationController(orgService, userService, $location, $routeParams) {

        var model = this;

        var userId = $routeParams.userId;
        model.userId = userId;
        var organizationId = $routeParams.organizationId;
        model.organizationId = organizationId;
        model.follow = false;

        this.followOrganization = followOrganization;

        //model.projectDetail = projectDetail;
        model.logout = logout;

        function init() {
            orgService
                .getOrganizationDetailsById(organizationId)
                .then(renderOrganization);
        }

        init();
        
        function followOrganization(orgIdToBeFollowed) {
            
        }

        function logout(user){
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                })
        }

        function renderOrganization(org) {
            model.org = org.data.organization;

        }



    }
})();