(function () {
    angular
        .module("Handouts")
        .controller("projectsController", projectsController);

    function projectsController(userService, orgService, currentUser, $routeParams) {

        var model = this;

        if(currentUser) {
            var userId = currentUser._id;
            model.userId = userId;
        }

        model.user = currentUser;


        model.getProjectsByOrgId = getProjectsByOrgId;

        function init() {
        console.log(model.user);

        getProjectsByOrgId(model.user.registrationNumber);

        }

        init();

        function getProjectsByOrgId(orgId) {
            orgService
                .getProjectsByOrgId(orgId)
                .then(function (projs) {
                    model.projs = projs.data.projects.project;
                    // console.log(model.projs);
                }, function (err) {
                    model.error = "Uh oh! Something went wrong.";
                    console.log(err);
                });
        }


    }
})();