(function () {
    angular
        .module('WAM') // Here, only reading the module
        .controller('loginController',loginController);

    function  loginController($location, userService) {
        var model = this;

        //Event Handlers
        model.login = login;

        function login (user) {
            if((user === null ) ||
                (user === '') ||
                (typeof user === 'undefined')) {
                model.error = 'username and password is required';
                return;
            }

            if(user.username === null || user.username === '' || typeof user.username === 'undefined') {
                model.error = 'username is required';
                return;
            }

            if(user.password === null || user.password === '' || typeof user.password === 'undefined') {
                model.error = 'password is required';
                return;
            }
            //var found = userService.findUserByCredentials(username, password);
            userService
                // .findUserByCredentials(username, password)
                .login(user.username, user.password)
                .then(function (found) {
                    // console.log(found);
                    if(found != null) {
                        $location.url('/profile');
                    } else {
                        model.error = "Sorry " + user.username + " not found, please try again";
                    }
                }, function () {
                    model.error = "Sorry " + user.username + " not found, please try again";
                });

        }
    }
}) ();