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
            if(widget.type === "YOUTUBE") {
                if ((widget.hasOwnProperty('url') === false) ||
                    widget.url === null ||
                    widget.url === '' ||
                    typeof widget.url === 'undefined') {
                    model.error = "YouTube Url is required";
                    return;
                }
            } else if(widget.type === "IMAGE") {
                if ((widget.hasOwnProperty('url') === false) ||
                    widget.url === null ||
                    widget.url === '' ||
                    typeof widget.url === 'undefined') {
                    model.error = "Image url is required";
                    return;
                }
                if ((widget.hasOwnProperty('width') === false) ||
                    widget.width === null ||
                    widget.width === '' ||
                    typeof widget.width === 'undefined') {
                    model.error = "Image width is required";
                    return;
                }
            } else if(widget.type === "HEADING" || widget.type === "HTML" ) {
                if ((widget.hasOwnProperty('text') === false) ||
                    widget.text === null ||
                    widget.text === '' ||
                    typeof widget.text === 'undefined') {
                    model.error = widget.type.toLowerCase() +" text is required";
                    return;
                }
            }

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