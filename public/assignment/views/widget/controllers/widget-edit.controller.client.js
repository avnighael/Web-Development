(function(){
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($sce,
                                  $routeParams,
                                  widgetService,
                                  $location) {
        var model = this;

        var userId = $routeParams.userId;
        model.userId = userId;
        var websiteId = $routeParams.websiteId;
        model.websiteId = websiteId;
        var pageId = $routeParams.pageId;
        model.pageId = pageId;
        var widgetId = $routeParams.widgetId;
        model.widgetId = widgetId;


        model.updateWidget=updateWidget;
        model.deleteWidget=deleteWidget;

        function init() {
            widgetService
                .findAllWidgetsForPage(pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });

            widgetService
                .findWidgetById(widgetId)
                .then(function (widget) {
                    model.widget = widget;
                });

        }
        init();

        function deleteWidget() {
            widgetService
                .deleteWidget(widgetId)
                .then(function () {
                    $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
                }, function () {
                    model.error = "Failed to delete the widget"
                });
        }

        function updateWidget(widget){
            widgetService
                .updateWidget(widgetId, widget)
                .then(function () {
                    $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
                }, function () {
                    model.error = "Invalid Widget. Failed to update widget"
                });
        }


    }
})();