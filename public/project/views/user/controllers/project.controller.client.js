(function () {
    angular
        .module("Handouts")
        .controller("ProjectController", ProjectController);

    function ProjectController(orgService, $location, $routeParams) {

        var model = this;

        var projectId = $routeParams.projectId;
        model.projectId = projectId;

        //model.projectDetail = projectDetail;

        function init() {
            orgService
                .getProjectDetailsById(projectId)
                .then(renderProject);
        }

        init();

        function renderProject(proj) {
            model.proj = proj.data.project;

        }



    }
})();