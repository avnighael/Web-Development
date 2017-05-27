(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams,
                                  $location,
                                  websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.createWebsite = createWebsite;

        function init() {
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
        }
        init();

        function createWebsite(website) {
            if(website === null || website === '' || typeof website === 'undefined') {
                model.error = 'Website name is required';
                return;
            } else {
                website.developerId = model.userId;
                websiteService.createWebsite(website);
                $location.url('/user/'+model.userId+'/website');
            }

        }
    }
})();