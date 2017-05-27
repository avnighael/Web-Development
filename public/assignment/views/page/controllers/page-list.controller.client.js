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
        //var pageId = $routeParams.pageId;
        //model.pageId = pageId;

        function init() {
            model.pages = pageService.findPagesByWebsiteId(websiteId);
        }

        init();

       /** function findPageByPageId(pageId) {
            model.page = pageService.findPageById(pageId);
        } **/

    }

})();
