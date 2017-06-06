(function () {
    angular
        .module('wbdvDirectives',[])
        .directive('wbdvSortable', wbdvSortableDir);

    function wbdvSortableDir($routeParams) {
        var pageId = $routeParams.pageId;

        function linkFunction(scope, element) {
            (element).sortable({
                axis: "y",
                start: function (event, ui) {
                    initial = (ui.item).index();
                },
                    stop: function(event, ui){
                        final = (ui.item).index();
                        //alert("New position: " + final + " Old Position:" + initial);
                        scope
                            .sortableController.reorderWidget(initial, final ,pageId);
                    }
            }
            );
        }
        return {
            link: linkFunction,
            scope: {},
            controller: sortableController,
            controllerAs: 'sortableController'

        }
    }

    function sortableController(widgetService) {
        var model = this;
        model.reorderWidget = reorderWidget;

        function reorderWidget(index1, index2, pageId) {
            widgetService
                .reorderWidget(index1, index2, pageId);
        }

    }
})();