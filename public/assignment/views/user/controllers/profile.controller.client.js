(function () {
    angular
        .module('WAM') // Here, only reading the module
        .controller('profileController', profileController);

    function  profileController($location, $routeParams, userService) {
        var model = this;

        model.deleteUser = deleteUser;
        model.updateUser = updateUser;

        model.userId = $routeParams['userId'];

        function init() {
            //model.user = userService.findUserById(model.userId);
            userService
                .findUserById(model.userId)
                .then(renderUser, userError);

            function renderUser(user){
                model.user = user;
            }

            function userError(error) {
                model.error = "User Not Found";
            }
        }

        init();

        function deleteUser(userId) {
            userService
                .deleteUser(userId)
                .then(function () {
                    $location.url('/login');
                }, function () {
                    model.error = "Unregistration failed!"
                });
        }

        function updateUser(newUser) {
            userService
                .updateUser(model.userId, newUser)
                .then(function (user) {
                    if (user != null) {

                        model.message = "User updated successfully"
                    }
                    else {
                        model.error = "Unable to update user";
                    }
                });
        }

    }
}) ();