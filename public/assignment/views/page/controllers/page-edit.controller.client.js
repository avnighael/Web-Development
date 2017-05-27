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
            var pages = pageService.findPagesByWebsiteId(websiteId);
            model.pages = pages;

            var page = pageService.findPageById(pageId);
            model.page = page;
        }

        init();

        function updatePage(page) {
            /**if(page === null || page === '' || typeof page === 'undefined') {
                model.error = 'Page name is required';
                return;
            } else { **/
                var updateCheck = pageService.updatePage(pageId, page);
                if (updateCheck) {
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page");
                } else {
                    model.error = "Invalid Page. Unable to update the page";
                }
            //}

        }

        function deletePage(pageId) {
            var deleteCheck = pageService.deletePage(pageId);
            if(deleteCheck) {
                $location.url("/user/"+userId+"/website/"+websiteId+"/page");
            } else {
                model.error = "Invalid Page. Unable to delete the page";
            }

        }

    }

})();
