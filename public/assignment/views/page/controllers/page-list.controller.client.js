(function () {
    angular
        .module('WAM')
        .controller('pageListController', pageListController);
    
    function pageListController($routeParams, pageService) {
        var model = this;

        var userId =  $routeParams.userId;
        model.userId = userId;
        var websiteId = $routeParams.websiteId;
        model.websiteId = websiteId;

        function init() {
            model.pages = pageService.findPagesByWebsiteId(websiteId);
        }

        init();
    }

})();
