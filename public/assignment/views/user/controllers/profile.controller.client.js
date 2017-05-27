(function () {
    angular
        .module('WAM') // Here, only reading the module
        .controller('profileController', profileController);

    function  profileController($location, $routeParams, userService) {
        var model = this;

        model.userId = $routeParams['userId'];

        model.user = userService.findUserById(model.userId);

    }
}) ();