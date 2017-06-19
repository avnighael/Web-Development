(function () {
    angular
        .module('Handouts') // Here, only reading the module
        .controller('profileController', profileController);

    function  profileController(currentUser, $location, userService) {
        var model = this;

        model.userId = currentUser._id;
        model.user = currentUser;
        model.deleteUser = deleteUser;
        model.updateUser = updateUser;
        model.modifyUser = modifyUser;
        model.logout = logout;
        model.unregister = unregister;

        function init() {
            //model.user = userService.findUserById(model.userId);
            // userService
            //     .findUserById(model.userId)
            //     .then(renderUser, userError);
            //
            // function renderUser(user){
            //     model.user = user;
            // }
            //
            // function userError(error) {
            //     model.error = "User Not Found";
            // }
        }

        init();

        function unregister() {
            userService
                .unregister(model.user)
                .then(function () {
                    $location.url('/');
                }, function () {
                    model.error = "Unregistration failed!";
                });
        }

        function logout(user){
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                })
        }

        function deleteUser(userId) {
            userService
                .deleteUser(userId)
                .then(function () {
                    $location.url('/login');
                }, function () {
                    model.error = "Unregistration failed!"
                });
        }

        function modifyUser(newUser) {
            if(newUser.username === null || newUser.username === '' || typeof newUser.username === 'undefined') {
                model.error = 'username is required';
                model.message = "";
                return;
            }

            //model.emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

            userService
                .modifyUser(model.userId, newUser)
                .then(function (user) {
                    if (user != null) {

                        model.message = "User updated successfully"
                        model.error="";
                    }
                    else {
                        model.error = "Unable to update user";
                    }
                }, function (err) {
                    console.log(err);
                    return err;
                });
        }


        function updateUser(newUser) {
            if(newUser.username === null || newUser.username === '' || typeof newUser.username === 'undefined') {
                model.error = 'username is required';
                model.message = "";
                return;
            }

            //model.emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

            userService
                .updateUser(model.userId, newUser)
                .then(function (user) {
                    if (user != null) {

                        model.message = "User updated successfully"
                        model.error="";
                    }
                    else {
                        model.error = "Unable to update user";
                    }
                });
        }

    }
}) ();