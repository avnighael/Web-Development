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

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO", "name": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum", "name": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "name": "Lorem pixel", "text": "Lorem pixel",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "name": "Lorem pixel", "text": "Lorem pixel",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "987", "widgetType": "HTML", "pageId": "123",
                "text": '<p>Philip Pullman is back with his first addition to the <em>His Dark Materials</em> saga in almost two decades. We now know what the first novel in <em>The Book of Dust</em> trilogy will be called and, roughly, what it’s about. There’s even an excerpt out for fans eager to dive back into Lyra’s world.<br></p>'}
        ];

        function deleteWidget(widgetId) {
            var url = "/api/assignment/widget/"+widgetId
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWidget(widgetId, newWidget) {
            var url = "/api/assignment/widget/"+widgetId
            return $http.put(url, newWidget)
                .then(function (response) {
                    return response.data;
                });

            // for (var w in widgets) {
            //     if (widgets[w]._id === widgetId) {
            //         widgets[w] = angular.copy(widget);
            //         return widgets[w];
            //     }
            // }
            // return null;
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