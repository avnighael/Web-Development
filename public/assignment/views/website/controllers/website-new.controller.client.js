(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams,
                                  $location,
                                  currentUser,
                                  websiteService) {
        var model = this;

        model.userId = currentUser._id;
        model.createWebsite = createWebsite;

        function init() {
            websiteService
                .findWebsitesByUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                })
        }
        init();

        function createWebsite(website) {
            if(website === null || website === '' || typeof website === 'undefined') {
                model.error = 'Website name is required';
                return;
            } else {
                website.developerId = model.userId;
                websiteService
                    .createWebsite(model.userId, website)
                    .then(function (website) {
                        model.websites = website;
                        $location.url('/website');
                    });
            }

        }
    }
})();