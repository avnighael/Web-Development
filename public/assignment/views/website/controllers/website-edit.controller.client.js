(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);
    
    function websiteEditController($routeParams,
                                   $location,
                                   websiteService) {
        var model = this;

        var userId = $routeParams.userId;
        model.userId =  userId;

        var websiteId = $routeParams.websiteId;
        model.websiteId = websiteId;

        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            var websites = websiteService.findWebsitesByUser(userId);
            model.websites = websites;

            var website = websiteService.findWebsiteById(model.websiteId);
            model.website = website;
        }

        init();

        function updateWebsite(websites) {
            var updateCheck = websiteService.updateWebsite(websiteId, websites);
            if(updateCheck) {
                $location.url("/user/"+model.userId+"/website/");
            } else {
                model.error = "Invalid Website. Unable to update website";
            }

        }

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/'+model.userId+'/website');
        }

    }

})();
