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
            pageService
                .findPagesByWebsiteId(websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
        }
        init();

        function createPage(websiteId, page) {
            if(page === null || page === '' || typeof page === 'undefined') {
                model.error = 'Page name is required';
                return;
            } else if(page.name === null || page.name === '' || typeof page.name === 'undefined') {
                model.error = 'Page name is required';
                return;
            } else {
                pageService
                    .createPage(websiteId, page)
                    .then(function (page) {
                        model.pages = page;
                        $location.url('/website/'+websiteId+'/page');
                    });
            }

        }
    }
})();