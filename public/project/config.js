(function () {
    angular
        .module('Handouts')
        .config(configuration);

    function checkLoggedIn(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .checkLoggedIn()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;

    }

    function checkCurrentUser(userService,$location, $q){
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function(response)
                {
                    var user = response;
                    if (user === '0')
                    {
                        deferred.resolve(null);
                    }
                    else  {
                        deferred.resolve(user);
                    }
                },
                function(err){
                    deferred.reject(user);
                });
        return deferred.promise;
    }

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

            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })

            .when('/user/give', {
                templateUrl: 'views/user/templates/give.view.client.html',
                controller: 'giveController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })

            .when('/user/:userId/browseOrganizations', {
                templateUrl: 'views/user/templates/browse-organization.view.client.html',
                controller: 'browseOrganizationController',
                controllerAs: 'model'
            })

            .when('/user/:userId/browseOrganizations/:organizationId', {
                templateUrl: 'views/user/templates/organization.view.client.html',
                controller: 'organizationController',
                controllerAs: 'model'
            })

            // .when('/browseProjects', {
            //     templateUrl: 'views/user/templates/give.view.client.html',
            //     controller: 'browseOrganizationController',
            //     controllerAs: 'model'
            // })

            .when('/browseProjects/:projectId', {
                templateUrl: 'views/user/templates/project.view.client.html',
                controller: 'ProjectController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })


            .when('/wishlist', {
                templateUrl: 'views/user/templates/wishlist.view.client.html',
                controller: 'wishlistController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })

    }
}) ();