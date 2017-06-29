(function () {
    angular
        .module("Handouts")
        .controller("browseOrganizationController", browseOrganizationController);

    function browseOrganizationController(orgService, userService, $location, $routeParams, currentUser) {

        var model = this;
        model.currentUser = currentUser;

        var userId = $routeParams.userId;
        model.userId = userId;

        model.getOrganization = getOrganization;
        model.logout = logout;

        function init() {
            getOrganization();

        }

        init();

        function logout(user){
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                })
        }


        function getOrganization() {
            orgService
                .getOrganization()
                .then(function (orgs) {
                    //model.orgs = orgs.charities.charity;
                    model.orgs = orgs.data.organizations.organization;
                    console.log(model.orgs);
                });
        }

    }
})();