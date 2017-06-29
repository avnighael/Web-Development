(function () {
    angular
        .module("Handouts")
        .controller("favouritesController", favouritesController);

    function favouritesController(currentUser) {

        var model = this;

        var userId = currentUser._id;
        model.userId = userId;
        model.currentUser = currentUser;
        model.logout = logout;

        function init() {
            model.favourites = model.user.favourites;
        }

        init();

        function logout(user){
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                })
        }

    }
})();