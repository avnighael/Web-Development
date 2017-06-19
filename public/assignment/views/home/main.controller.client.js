(function () {
    angular
        .module('WAM')
        .controller('mainController', mainController);

    function mainController(currentUser, userService, $location) {
        var model = this;

        model.currentUser = currentUser;
        model.logout = logout;

        function logout(currentUser){
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                })
        }

    }

})();
