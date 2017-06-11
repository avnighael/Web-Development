(function() {
    angular
        .module('WAM')
        .service('widgetService', widgetService);

    function widgetService($http) {

        this.findAllWidgetsForPage = findAllWidgetsForPage;
        this.findWidgetById = findWidgetById;
        this.createWidget = createWidget;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;
        this.reorderWidget = reorderWidget;
        
        function reorderWidget(index1, index2, pageId) {
            var url = "/page/"+pageId+"/widget?initial="+index1+"&final="+index2;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWidget(widgetId) {
            var url = "/api/assignment/widget/"+widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWidget(widgetId, newWidget) {
            var url = "/api/assignment/widget/"+widgetId;
            return $http.put(url, newWidget)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetById(widgetId) {
            var url = "/api/assignment/widget/"+widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createWidget(pageId, newWidget) {
            var url = "/api/assignment/page/"+pageId+"/widget";
            return $http.post(url, newWidget)
                .then(function (response) {
                   // console.log(response.data);
                    return response.data;
                });
        }

        function findAllWidgetsForPage(pageId) {
            var url = "/api/assignment/page/"+pageId+"/widget";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();