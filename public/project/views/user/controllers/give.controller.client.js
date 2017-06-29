(function () {
    angular
        .module("Handouts")
        .controller("giveController", giveController);

    function giveController(orgService,
                            $location,
                            currentUser,
                            userService,
                            $routeParams) {

        var model = this;

        // var userId = currentUser._id;
        // model.userId = userId;
        model.currentUser = currentUser;
        model.thisUserId = $routeParams.userId;


        var organizationId = $routeParams.organizationId;
        model.organizationId = organizationId;

        if($routeParams.userId) {
            model.isAdmin =true;
        }

        model.getProjectsByKeyWords = getProjectsByKeyWords;
        model.getProjectsByCountry = getProjectsByCountry;
        model.getProjectsByCauses = getProjectsByCauses;
        model.getProjectsByCauseId = getProjectsByCauseId;
        model.logout = logout;

        function init() {
            if($routeParams.keywords){
                getProjectsByKeyWords($routeParams.keywords);
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

        function getProjectsByCauses(causeQuery) {
            orgService
                .getCauseID()
                .then(function (causes) {
                    //model.orgs = orgs.charities.charity;
                    model.causes = causes.data.themes.theme;
                    for (var c in model.causes) {
                        if (causeQuery.toLowerCase() === model.causes[c].name.toLowerCase()) {
                            var causeId = model.causes[c].id;
                            model.causeId = causeId;
                            break;
                        }
                    }
                    getProjectsByCauseId(causeId);
                });
        }
        function getProjectsByCauseId(causeId) {
            orgService
                .getProjectsByCauseId(causeId)
                .then(function (projs) {
                    //model.orgs = orgs.charities.charity;
                    model.numberFound = projs.data.projects.numberFound;
                    model.projs = projs.data.projects.project;
                }, function () {
                    model.error = "No results found";
                });
        }


        function getProjectsByCountry(countryQuery) {
            orgService
                .getProjectsByCountry(countryQuery)
                .then(function (projs) {
                    if(projs.data.projects.project) {
                        model.projs = projs.data.projects.project;
                        model.numberFound = projs.data.projects.numberFound;
                    } else {
                        model.projs = projs.data.projects;
                    }
                }, function () {
                    model.error = "No results found";
                });
        }


        function getProjectsByKeyWords(browseText) {
            orgService
                .getProjectsByKeyWords(browseText)
                .then(function (projs) {
                    //model.orgs = orgs.charities.charity;
                    model.numberFound = projs.data.search.response.numberFound;
                    if(model.numberFound > 0)
                    model.projs = projs.data.search.response.projects.project;
                    // console.log(model.projs);

                }, function () {
                    model.error = "No results found";
                });
        }

    }
})();