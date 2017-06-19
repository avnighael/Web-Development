(function () {
    angular
        .module('WAM')
        .controller('widgetListController', widgetListController);

    function widgetListController($sce,
                                  $routeParams,
                                  widgetService,
                                  $location) {
        var model = this;

        var userId =  $routeParams.userId;
        model.userId = userId;
        var websiteId = $routeParams.websiteId;
        model.websiteId = websiteId;
        var pageId = $routeParams.pageId;
        model.pageId = pageId;


        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.widgetUrl = widgetUrl;
        model.widgetEditUrl = widgetEditUrl;

        function init() {
            widgetService
                .findAllWidgetsForPage(pageId)
                .then(function (widgets) {
                    model.widgets = widgets.sort(compareWidgets);
                });
        }

        init();
        
        function compareWidgets(w1, w2) {
            if (w1.order < w2.order)
                return -1;
            if (w1.order > w2.order)
                return 1;
            return 0;
        }

        function widgetEditUrl(widget) {
            var url = 'views/widget/templates/editor/widget-'+widget.type.toLowerCase()+'-edit.view.client.html';
            $location.url("/website/" + websiteId + "/page/" + pageId + "/widget" + widget.type.toLowerCase());
        }

        function widgetUrl(widget) {
            var url = 'views/widget/templates/widget-'+widget.type.toLowerCase()+'.view.client.html';
            return url;
        }

        function getYouTubeEmbedUrl(linkUrl) {
             var embedUrl="https://www.youtube.com/embed/";
             var linkUrlParts = linkUrl.split('/');
             embedUrl += linkUrlParts[linkUrlParts.length - 1];
             return $sce.trustAsResourceUrl(embedUrl);
        }

        function trust(html) {
            return $sce.trustAsHtml(html);

        }


    }
})();
