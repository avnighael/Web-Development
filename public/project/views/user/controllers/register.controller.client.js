(function () {
    angular
        .module('Handouts')
        .controller('registerController', registerController);

    function registerController($location, userService, $rootScope) {

        var model = this;

        model.register = register;
        model.createUser = createUser;

        function createUser(user) {
                userService
                    .register(user)
                    .then(function (response) {
                        var user = response;
                        $rootScope.currentUser = user;
                        $location.url("/profile");
                    });
        }

        function register(user) {

            if((user.username === null && user.password === null) ||
                (user.username === '' && user.password === '') ||
                (typeof user.username === 'undefined' && typeof user.password === 'undefined')) {
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

            if(user.password !== user.cpassword || user.password === null || typeof user.password === 'undefined') {
                model.error = "Passwords doesn't match, Try Again";
                return;
            }

            userService
                .findUserByUsername(user.username)
                .then(function (status) {
                    if(!status)
                        model.createUser(user);
                    else
                        model.error = "Sorry, this username is taken";
                });
        }
    }
})();