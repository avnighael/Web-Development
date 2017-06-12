(function () {
    angular
        .module('Handouts')
        .config(configuration);

    function configuration ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html '
            })

            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })

            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
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