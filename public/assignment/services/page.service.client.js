(function() {
    angular
        .module('WAM')
        .service('pageService', pageService);

    function pageService($http) {

        this.findPagesByWebsiteId = findPagesByWebsiteId;
        this.createPage = createPage;
        this.findPageById = findPageById;
        this.deletePage = deletePage;
        this.updatePage = updatePage;

        function updatePage(pageId, newPage) {
            var url = "/api/assignment/page/"+pageId;
            return $http.put(url, newPage)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePage(pageId) {
            var url = "/api/assignment/page/"+pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPageByIdForDel(pageId) {
            return pages.find(function (page) {
                return page._id === pageId;
            });
        }

        function findPageById(pageId) {
            var url = "/api/assignment/page/"+pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

       function createPage(websiteId, page) {
           var url = "/api/assignment/website/"+websiteId+"/page";
           return $http.post(url, page)
               .then(function (response) {
                   return response.data;
               });
       }

        function findPagesByWebsiteId(websiteId) {
            var url = "/api/assignment/website/"+websiteId+"/page";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();
