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
            var widgets = widgetService.findWidgetsByPageId(pageId);
            model.widgets = widgets;

            var widget = widgetService.findWidgetById(model.widgetId);
            model.widget = widget;
        }
        init();

        function deleteWidget() {
            var deleteCheck = widgetService.deleteWidget(widgetId);
            if(deleteCheck) {
                $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget");
            } else {
                model.error = "Invalid Widget. Unable to delete widget";
            }
        }

        function updateWidget(widget){
            var updateCheck = widgetService.updateWidget(widgetId, widget);
            if(updateCheck) {
                $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget");
            } else {
                model.error = "Invalid Widget. Unable to update widget";
            }
        }


    }
})();