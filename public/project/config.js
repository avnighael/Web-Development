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
                    $location.url('/login');
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
                    $location.url('/');
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

    function checkUserAdminOrganization(userService,$location, $q) {
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function(response)
                {
                    var user = response;
                    if (user === '0')
                    {
                        deferred.reject();
                        $location.url('/');
                    }
                    else  {
                        if(user.role === 'ORGANIZATION' || user.role === 'ADMIN') {
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
                templateUrl: 'views/home/home.view.client.html ',
                controller: 'homeController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
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

            .when('/user/give/:keywords', {
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
                    currentUser: checkUserAdminOrganization
                }
            })

            .when('/organization/project/:projectId/opportunity/:opportunityId/edit', {
                templateUrl: 'views/volunteer-opportunity/templates/opportunity.view.client.html',
                controller: 'volunteerOpportunityController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkUserAdminOrganization
                }
            })

            .when('/organization/opportunity/all', {
                templateUrl: 'views/volunteer-opportunity/templates/organization-all-opportunities.view.client.html',
                controller: 'organizationAllOpportunityController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })

            .when('/opportunity/all', {
                templateUrl: 'views/volunteer-opportunity/templates/all-opportunities.view.client.html',
                controller: 'allOpportunityController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })

            .when('/organization/opportunity/:opportunityId', {
                templateUrl: 'views/volunteer-opportunity/templates/view-opportunity.view.client.html',
                controller: 'volunteerOpportunityController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })

            .when('/project/:projectId/opportunity/all', {
                templateUrl: 'views/volunteer-opportunity/templates/project-opportunities.view.client.html',
                controller: 'projectOpportunitiesController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })

            .when('/users/all/manage', {
                templateUrl: 'views/admin/templates/admin-users-list.view.client.html',
                controller: 'AdminUsersController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })

            .when('/admin/user/:userId/add', {
                templateUrl: 'views/user/templates/give.view.client.html',
                controller: 'giveController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })

            .when('/admin/user/create', {
                templateUrl: 'views/admin/templates/admin-user-create.view.client.html',
                controller: 'AdminUsersController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })

            .when('/admin/user/:userId/edit', {
                templateUrl: 'views/admin/templates/admin-user-edit.view.client.html',
                controller: 'AdminUsersController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })

            .when('/admin/user/:userId/details', {
                templateUrl: 'views/admin/templates/admin-user-details-edit.view.client.html',
                controller: 'AdminUsersDetailsController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })

            .when('/admin/user/:userId/browseProjects/:projectId', {
                templateUrl: 'views/project/templates/project.view.client.html',
                controller: 'ProjectController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })

            .when('/admin/user/:userId/addFollower', {
                templateUrl: 'views/admin/templates/admin-add-follower.view.client.html',
                controller: 'AdminAddFollowerController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })

            .when('/admin/user/:userId/addFollowing', {
                templateUrl: 'views/admin/templates/admin-add-following.view.client.html',
                controller: 'AdminAddFollowingController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })

            .when('/admin/user/:userId/opportunity/add', {
                templateUrl: 'views/volunteer-opportunity/templates/all-opportunities.view.client.html',
                controller: 'allOpportunityController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })

            .when('/admin/user/:userId/organization/projects', {
                templateUrl: 'views/project/templates/projects.view.client.html',
                controller: 'projectsController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })

            .when('/admin/:userId/organization/project/:projectId/opportunity/create', {
                templateUrl: 'views/volunteer-opportunity/templates/opportunity.view.client.html',
                controller: 'volunteerOpportunityController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkUserAdminOrganization
                }
            })



            // .when('/admin/user/:userId/browseProjects/:projectId', {
            //     templateUrl: 'views/project/templates/project.view.client.html',
            //     controller: 'ProjectController',
            //     controllerAs: 'model',
            //     resolve: {
            //         currentUser: checkAdmin
            //     }
            // })

    }
}) ();