(function () {
    angular
        .module("Handouts")
        .controller("browseOrganizationController", browseOrganizationController);

    function browseOrganizationController(orgService, $location) {

        var model = this;

        model.getOrgs = getOrgs;
        model.getProjectsByCountry = getProjectsByCountry;
        model.getProjectsByCauses = getProjectsByCauses;
        model.getProjectsByCauseId = getProjectsByCauseId;

        function init() {
            // orgService
            //     .authenticateAPI()
            //     .then(function (response) {
            //         model.auth = response;
            //     })
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
                });
        }




        function getProjectsByCountry(countryQuery) {
            orgService
                .getProjectsByCountry(countryQuery)
                .then(function (projs) {
                    //model.orgs = orgs.charities.charity;
                    model.projs = projs.data.projects.project;
                });
        }


        function getOrgs(browseText) {
            orgService
                .getOrgs(browseText)
                .then(function (projs) {
                    //model.orgs = orgs.charities.charity;
                    model.projs = projs.data.search.response.projects.project;
                });
        }

    }
})();