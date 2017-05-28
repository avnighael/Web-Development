(function() {
    angular
        .module('WAM')
        .service('widgetService', widgetService);

    function widgetService() {

        this.findWidgetsByPageId = findWidgetsByPageId;
        this.findWidgetById = findWidgetById;
        this.createWidget = createWidget;
        this.setHeaderWidgetType = setHeaderWidgetType;
        this.setHtmlWidgetType = setHtmlWidgetType;
        this.setImageWidgetType = setImageWidgetType;
        this.setYouTubeWidgetType = setYouTubeWidgetType;
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
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    var widget = findWidgetById(widgetId);
                    var index = widgets.indexOf(widget);
                    widgets.splice(index,1);
                    return angular.copy(widget);
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            for (var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    widgets[w] = angular.copy(widget);
                    return widgets[w];
                }
            }
            return null;
        }

        function findWidgetById(widgetId) {
            return widgets.find(function (widget) {
                return widget._id === widgetId;
            });
        }

        function setHeaderWidgetType() {
            var newHeader = {"_id": "", "widgetType": "HEADING", "pageId": "", "size": '', "text": "", "name": ""};
            var id = (new Date()).getTime();
            newHeader._id = id.toString();

            return newHeader;
        }

        function setHtmlWidgetType() {
            var newHtml = { "_id": "", "widgetType": "HTML", "pageId": "", "text": ""};
            var id = (new Date()).getTime();
            newHtml._id = id.toString();

            return newHtml;
        }

        function setImageWidgetType() {
            var newImage = { "_id": "", "widgetType": "IMAGE", "pageId": "", "width": "",
                "url": ""}
            var id = (new Date()).getTime();
            newImage._id = id.toString();

            return newImage;
        }

        function setYouTubeWidgetType() {
            var newYouTubeWidget = { "_id": "", "widgetType": "YOUTUBE", "pageId": "", "width": "",
                "url": "" };
            var id = (new Date()).getTime();
            newYouTubeWidget._id = id.toString();

            return newYouTubeWidget;
        }

        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            widgets.push(widget);

        }

        function findWidgetsByPageId(pageId) {
            var results = [];

            for(var w in widgets) {
                if(widgets[w].pageId === pageId) {
                    results.push(widgets[w]);
                }
            }
            return results;
        }

    }
})();