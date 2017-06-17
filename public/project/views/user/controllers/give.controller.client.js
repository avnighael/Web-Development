(function () {
    angular
        .module("Handouts")
        .controller("giveController", giveController);

    function giveController(orgService, $location, $routeParams) {

        var model = this;

        var userId = $routeParams.userId;
        model.userId = userId;
        var organizationId = $routeParams.organizationId;
        model.organizationId = organizationId;

        model.getProjectsByKeyWords = getProjectsByKeyWords;
        model.getProjectsByCountry = getProjectsByCountry;
        model.getProjectsByCauses = getProjectsByCauses;
        model.getProjectsByCauseId = getProjectsByCauseId;

        function init() {

        }

        init();

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
                    model.projs = projs.data.projects.project;
                }, function () {
                    model.error = "No results found";
                });
        }




        function getProjectsByCountry(countryQuery) {
            orgService
                .getProjectsByCountry(countryQuery)
                .then(function (projs) {
                    //model.orgs = orgs.charities.charity;
                    model.projs = projs.data.projects.project;
                }, function () {
                    model.error = "No results found";
                });
        }


        function getProjectsByKeyWords(browseText) {
            orgService
                .getProjectsByKeyWords(browseText)
                .then(function (projs) {
                    //model.orgs = orgs.charities.charity;
                    model.projs = projs.data.search.response.projects.project;
                }, function () {
                    model.error = "No results found";
                });
        }

    }
})();