(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);
    
    function pageEditController($routeParams,
                                   $location,
                                   pageService) {
        var model = this;

        var userId = $routeParams.userId;
        model.userId =  userId;

        var websiteId = $routeParams.websiteId;
        model.websiteId = websiteId;

        var pageId = $routeParams.pageId;
        model.pageId = pageId;

        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
           pageService
               .findPagesByWebsiteId(websiteId)
               .then(function (pages) {
                   model.pages = pages;
               });

            pageService
                .findPageById(pageId)
                .then(function (page) {
                    model.page = page;
                });
        }

        init();

        function updatePage(page) {
            if (page.name === null || page.name === '' || typeof page.name === 'undefined') {
                model.error = 'Page name is required';
                return;
            }
            else {
                pageService
                    .updatePage(pageId, page)
                    .then(function (page) {
                        if (page != null) {
                            model.message = "Page updated successfully";
                            model.error = "";
                            $location.url("/website/" + websiteId + "/page");
                        }
                        else {
                            model.error = "Unable to update the page";
                        }
                    });
            }
        }

        function deletePage(pageId) {

                pageService
                    .deletePage(pageId)
                    .then(function () {
                        $location.url("/website/" + websiteId + "/page");
                    });

        }

    }

})();
