(function () {
    angular
        .module('WAM') // Here, only reading the module
        .controller('profileController', profileController);

    function  profileController($location, $routeParams, userService) {
        var model = this;

        model.deleteUser = deleteUser;
        model.updateUser = updateUser;

        model.userId = $routeParams['userId'];

        model.user = userService.findUserById(model.userId);

        function deleteUser(userId) {
            userService.deleteUser(userId);
            $location.url('/login');
        }

        function updateUser(newUser) {
            var user = userService.updateUser(model.userId, newUser);

            if (user != null) {

                model.message = "User updated successfully"
            }
            else {
                model.error = "Unable to update user";
            }

        }

    }
}) ();