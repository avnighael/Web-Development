(function () {
    angular
        .module("Handouts")
        .controller("wishlistController", wishlistController);

    function wishlistController(userService, $routeParams, currentUser, $location) {

        var model = this;

        var userId = currentUser._id;
        model.userId = userId;

        model.currentUser = currentUser;

        model.getWishList = getWishList;
        model.logout = logout;

        function init() {
            getWishList();
             model.currentUser = currentUser;
            console.log(model.currentUser.role);
            // userService
            //     .findUserById(model.userId)
            //     .then(renderUser, userError);
        }

        init();

        function logout(user){
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                })
        }

        // function renderUser(user) {
        //     model.currentUser = user;
        // }
        //
        // function userError(error) {
        //     model.error = "User Not Found";
        // }


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

    // function  profileController($routeParams, userService) {
    //
    //     var model = this;
    //
    //     model.userId = $routeParams['userId'];
    //
    //     function init() {
    //         //model.currentUser = userService.findUserById(model.userId);
    //         userService
    //             .findUserById(model.userId)
    //             .then(renderUser, userError);
    //
    //         function renderUser(user) {
    //             model.currentUser = user;
    //         }
    //
    //         function userError(error) {
    //             model.error = "User Not Found";
    //         }
    //     }
    //
    //     init();
    // }
})();