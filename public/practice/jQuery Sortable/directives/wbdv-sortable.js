(function () {
    angular
        .module('wbdvDirectives',[])
        .directive('wbdvSortable', wbdvSortableDir);

    function wbdvSortableDir($routeParams) {
        var pageId = $routeParams.pageId;

        function linkFunction(scope, element) {
            var initial = -1;
            var final = -1;

            (element).sortable(
                {axis: "x",
                stop: function(event, ui) {
                alert("New position: " + ui.item.index());
            }}
                // {update: function(e, ui) {
                //     oldPos = ui.item.sortable.index;
                //     newPos = ui.item.sortable.dropindex;
                //     alert('old_index -'+oldPos+' new index -'+newPos);
                // }}
            );
        }

        return {
            link: linkFunction
        }
    }


    function sortableController(WidgetService) {
        var model = this;
        model.reorderWidget = reorderWidget;

        function reorderWidget(initial, final, pageId) {
            widgetService
                .reorderWidget(initial, final, pageId);
        }
    }
})();