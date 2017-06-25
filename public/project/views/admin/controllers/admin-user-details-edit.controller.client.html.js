(function () {
    angular
        .module("Handouts")
        .controller("AdminUsersDetailsController", AdminUsersDetailsController);

    function AdminUsersDetailsController(adminService, currentUser, userService, $location, $routeParams) {

        var model = this;

        model.currentUser = currentUser;
        var thisUserId = $routeParams.userId;;
        model.thisUserId = thisUserId;

        model.removeFromFavourites = removeFromFavourites;
        model.addToFavourites = addToFavourites;


        function init() {

            if(!model.thisUserId) {
                getAllDonors();
            } else {
                getUserById(model.thisUserId);
            }

        }

        init();

        function removeFromFavourites(projectId) {
            userService
                .removeFromFavourites(thisUserId, projectId)
                .then(function (response) {
                    getAllDonors();
                    // model.favourite = false;
                },function (err) {
                    model.unauthorized = "Please register/login to add this project to WishList";
                    console.log(err);
                })
        }

        function addToFavourites(projectId, project) {
            userService
                .addToFavourites(thisUserId, projectId, project)
                .then(function (response) {
                    // model.favourite = true;
                    // model.notFavourite = null;
                    // console.log(response);
                },function (err) {
                    console.log(err);
                })
        }


        function getUserById(thisUserId) {
            adminService
                .getUserById(thisUserId)
                .then(function (thisUser) {
                    console.log(model.thisUserId);
                    model.thisUser = thisUser;
                }, function (err) {
                    console.log(err);
                })
        }




    }
})();