(function() {
    angular
        .module('WAM')
        .service('pageService', pageService);

    function pageService() {

        this.findPagesByWebsiteId = findPagesByWebsiteId;
        this.createPage = createPage;
        this.findPageById = findPageById;
        this.deletePage = deletePage;
        this.updatePage = updatePage;

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Blog", "websiteId": "123", "description": "Lorem ipsum" }
        ];


        function updatePage(pageId, page) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    pages[p].name = page.name;
                    pages[p].description = page.description;
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }


        function deletePage(pageId) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    var page = findPageById(pageId);
                    var index = pages.indexOf(page);
                    pages.splice(index,1);
                    return angular.copy(page);
                }
                //return null;
            }
            return null;
        }


        function findPageById(pageId) {
            for (var p in pages) {
                var page = pages[p]
                if (page._id === pageId) {
                    return angular.copy(page);
                }
            }
            return null;
        }

       function createPage(websiteId, page) {
           page._id = (new Date()).getTime() + "";
           page.websiteId = websiteId;
           pages.push(page);
           return;
       }

        function findPagesByWebsiteId(websiteId) {
            var results = [];

            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {
                    results.push(pages[p]);
                }
            }

            return results;
        }

    }
})();
