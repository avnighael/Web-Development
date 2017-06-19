(function () {
    angular
        .module("Handouts")
        .controller("wishlistController", wishlistController);

    function wishlistController(userService, $routeParams, currentUser) {

        var model = this;

        var userId = currentUser._id;
        model.userId = userId;

        model.user = currentUser;

        model.getWishList = getWishList;

        function init() {
            getWishList();

            // userService
            //     .findUserById(model.userId)
            //     .then(renderUser, userError);
        }

        init();

        function renderUser(user) {
            model.user = user;
        }

        function userError(error) {
            model.error = "User Not Found";
        }


        function getWishList() {
            userService
                .getWishlist(userId)
                .then(function (projs) {
                   // console.log(projs);
                    //model.orgs = orgs.charities.charity;
                    model.wishlist = projs;
                });
        }

    }

    function  profileController($routeParams, userService) {

        var model = this;

        model.userId = $routeParams['userId'];

        function init() {
            //model.user = userService.findUserById(model.userId);
            userService
                .findUserById(model.userId)
                .then(renderUser, userError);

            function renderUser(user) {
                model.user = user;
            }

            function userError(error) {
                model.error = "User Not Found";
            }
        }

        init();
    }
})();