(function () {
    angular
        .module('wbdvDirectives',[])
        .directive('wbdvSortable', wbdvSortableDir);

    function wbdvSortableDir() {
        function linkFunction(scope, element) {
            (element).sortable({
                axis: "y"
            });
        }
        return {
            link: linkFunction
        }
    }
})();