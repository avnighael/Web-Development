(function () {
    angular
        .module('Handouts')
        .config(configuration);

    function configuration ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html '
            })

            .when('/browseProjects', {
                templateUrl: 'views/user/templates/browse-organization.view.client.html',
                controller: 'browseOrganizationController',
                controllerAs: 'model'
            })

            .when('/browseProjects/:projectId', {
                templateUrl: 'views/user/templates/project.view.client.html',
                controller: 'ProjectController',
                controllerAs: 'model'
            })

    }
}) ();