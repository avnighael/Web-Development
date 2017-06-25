(function () {
    angular
        .module("Handouts")
        .controller("favouritesController", favouritesController);

    function favouritesController(currentUser) {

        var model = this;

        var userId = currentUser._id;
        model.userId = userId;
        model.user = currentUser;

        function init() {
            model.favourites = model.user.favourites;
        }

        init();

    }
})();