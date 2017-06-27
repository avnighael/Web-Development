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

        if($routeParams.userId) {
            var thisUserId = $routeParams.userId;
            model.thisUserId = thisUserId;
        }

        model.user = currentUser;


        model.getProjectsByOrgId = getProjectsByOrgId;

        function init() {
        // console.log(model.user);

        if(thisUserId) {
            userService
                .findUserById(thisUserId)
                .then(function (thisUser) {
                    model.thisUser = thisUser;
                    getProjectsByOrgId(thisUser.registrationNumber);
                })
        } else {
            getProjectsByOrgId(model.user.registrationNumber);

        }

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