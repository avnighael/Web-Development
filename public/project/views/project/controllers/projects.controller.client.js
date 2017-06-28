(function () {
    angular
        .module("Handouts")
        .controller("projectsController", projectsController);

    function projectsController(userService,
                                orgService,
                                currentUser,
                                $routeParams,
                                $location) {

        var model = this;

        if(currentUser) {
            var userId = currentUser._id;
            model.userId = userId;
            model.currentUser = currentUser;
        }

        if($routeParams.userId) {
            var thisUserId = $routeParams.userId;
            model.thisUserId = thisUserId;
            model.isAdmin = true;
        }


        model.getProjectsByOrgId = getProjectsByOrgId;
        model.logout = logout;

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
            getProjectsByOrgId(model.currentUser.registrationNumber);

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