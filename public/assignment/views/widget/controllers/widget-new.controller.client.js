(function () {
    angular
        .module('WAM')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($routeParams,
                                 $location, 
                                 widgetService) {
        var model = this;

        var userId =  $routeParams.userId;
        model.userId = userId;
        var websiteId = $routeParams.websiteId;
        model.websiteId = websiteId;
        var pageId = $routeParams.pageId;
        model.pageId = pageId;

        model.setHeaderWidgetType = setHeaderWidgetType;
        model.setHtmlWidgetType = setHtmlWidgetType;
        model.setImageWidgetType = setImageWidgetType;
        model.setYouTubeWidgetType = setYouTubeWidgetType;

        function init() {
            var widgets = widgetService.findWidgetsByPageId(pageId);
            model.widgets = widgets;
        }

        init();

        function setHeaderWidgetType() {
            model.widget = widgetService.setHeaderWidgetType();
            model.widgetId = model.widget._id;

            widgetService.createWidget(pageId, model.widget);

            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + model.widgetId);
        }

        function setHtmlWidgetType() {
            model.widget = widgetService.setHtmlWidgetType();
            model.widgetId = model.widget._id;

            widgetService.createWidget(pageId, model.widget);

            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + model.widgetId);
        }

        function setImageWidgetType() {
            model.widget = widgetService.setImageWidgetType();
            model.widgetId = model.widget._id;

            widgetService.createWidget(pageId, model.widget);

            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + model.widgetId);
        }

        function setYouTubeWidgetType() {
            model.widget = widgetService.setYouTubeWidgetType();
            model.widgetId = model.widget._id;

            widgetService.createWidget(pageId, model.widget);

            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + model.widgetId);
        }


    }
})();