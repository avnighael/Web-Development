(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController($routeParams,
                                  $location,
                                  pageService) {
        var model = this;

        var userId = $routeParams.userId;
        model.userId = userId;
        var websiteId = $routeParams.websiteId;
        model.websiteId = websiteId;

        model.createPage = createPage;

        function init() {
            model.pages = pageService.findPagesByWebsiteId(websiteId);
        }
        init();

        function createPage(websiteId, page) {
            if(page === null || page === '' || typeof page === 'undefined') {
                model.error = 'Page name is required';
                return;
            } else {
                pageService.createPage(websiteId, page);
                $location.url('/user/'+model.userId+'/website/'+websiteId+'/page');
            }

        }
    }
})();