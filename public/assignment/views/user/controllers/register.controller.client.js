(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;

        model.register = register;

        function register(username, password, password2, firstName, lastName, email) {

            if((username === null && password === null) ||
                (username === '' && password === '') ||
                (typeof username === 'undefined' && typeof password === 'undefined')) {
                model.error = 'username and password is required';
                return;
            }

            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'username is required';
                return;
            }

            if(password === null || password === '' || typeof password === 'undefined') {
                model.error = 'password is required';
                return;
            }

            if(password !== password2 || password === null || typeof password === 'undefined') {
                model.error = "passwords must match";
                return;
            }


            userService
                .findUserByUsername(username)
                .then(
                    function () {
                        model.error = "sorry, that username is taken";
                    },
                    function () {
                        var newUser = {
                            username: username,
                            password: password,
                            firstName: firstName,
                            lastName: lastName,
                            email: email
                        };
                        return userService
                            .createUser(newUser);
                    }
                )
                .then(function (user) {
                    $location.url('/user/' + user._id);
                });

            // var found = userService.findUserByUsername(username);
            //
            // if(found !== null) {
            //     model.error = "Sorry, this username is already taken";
            // } else {
            //     var newUser = {
            //         username: username,
            //         password: password,
            //         firstName: firstName,
            //         lastName: lastName,
            //         email: email
            //     };
            //     newUser = userService.createUser(newUser);
            //     $location.url('/user/' + newUser._id);
            // }
        }
    }
})();