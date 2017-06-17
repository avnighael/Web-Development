(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);
    
    function websiteEditController($routeParams,
                                   $location,
                                   currentUser,
                                   websiteService) {
        var model = this;

        var userId = currentUser._id;
        model.userId =  userId;

        var websiteId = $routeParams.websiteId;
        model.websiteId = websiteId;

        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            websiteService
                .findWebsitesByUser(userId)
                .then(function (websites) {
                    model.websites=websites;
                });

            websiteService
                .findWebsiteById(websiteId)
                .then(function (website) {
                    model.website  = website;
                });
        }

        init();

        function updateWebsite(websites) {
            if (websites.name === null || websites.name === '' || typeof websites.name === 'undefined') {
                model.error = 'Website name is required';
                return;
            }
            else {
                //console.log(websites);
                websiteService
                    .updateWebsite(websiteId, websites)
                    .then(function (website) {
                        console.log(website);
                        if (website != null) {
                            $location.url("/website");
                        }
                        else {
                            model.error = "Invalid Website. Unable to update website";
                        }
                    });
            }
        }

        function deleteWebsite(websiteId) {
            websiteService
                .deleteWebsite(websiteId)
                .then(function () {
                    $location.url('/website');
                }, function () {
                    model.error = "Failed to delete the website";
                })

        }

    }

})();
