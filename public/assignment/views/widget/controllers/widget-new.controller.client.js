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

        model.createWidget = createWidget;

        function init() {
            widgetService
                .findAllWidgetsForPage(pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });
        }

        init();
        
        function createWidget(widgetType) {
            var newWidget = {};
            //newWidget._id = (new Date()).getTime() + "";
            newWidget.type = widgetType;

            widgetService
                .createWidget(pageId, newWidget)
                .then(function(widget){
                    console.log(widget._id);
                    model.widget = widget;
                    $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widget._id);
                });
        }



    }
})();