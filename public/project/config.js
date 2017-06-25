(function () {
    angular
        .module('Handouts')
        .config(configuration);

    function checkAdmin(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .checkAdmin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;

    }

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

    function checkUserOrganization(userService,$location, $q) {
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
                        if(user.role === 'ORGANIZATION') {
                            deferred.resolve(user);
                        }
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

            .when('/browseOrganizations', {
                templateUrl: 'views/user/templates/browse-organization.view.client.html',
                controller: 'browseOrganizationController',
                controllerAs: 'model'
            })

            .when('/browseOrganizations/:organizationId', {
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
                templateUrl: 'views/project/templates/project.view.client.html',
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

            .when('/favourites', {
                templateUrl: 'views/user/templates/favourites.view.client.html',
                controller: 'favouritesController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })

            .when('/organization/projects', {
                templateUrl: 'views/project/templates/projects.view.client.html',
                controller: 'projectsController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })

            .when('/user/:userId', {
                templateUrl: 'views/user/templates/user.view.client.html',
                controller: 'userController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })

            .when('/organization/project/:projectId/opportunity/create', {
                templateUrl: 'views/volunteer-opportunity/templates/opportunity.view.client.html',
                controller: 'volunteerOpportunityController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkUserOrganization
                }
            })

            .when('/organization/project/:projectId/opportunity/:opportunityId/edit', {
                templateUrl: 'views/volunteer-opportunity/templates/opportunity.view.client.html',
                controller: 'volunteerOpportunityController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkUserOrganization
                }
            })

            .when('/organization/opportunity/all', {
                templateUrl: 'views/volunteer-opportunity/templates/all-opportunities.view.client.html',
                controller: 'allOpportunityController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkUserOrganization
                }
            })

            .when('/organization/opportunity/:opportunityId', {
                templateUrl: 'views/volunteer-opportunity/templates/view-opportunity.view.client.html',
                controller: 'volunteerOpportunityController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkUserOrganization
                }
            })
    }
}) ();