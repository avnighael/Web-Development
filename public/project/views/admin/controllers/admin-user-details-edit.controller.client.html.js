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
        model.getAllUsers = getAllUsers;
        model.unfollow = unfollow;


        function init() {

            if(!model.thisUserId) {
                getAllUsers();
            } else {
                getUserById(model.thisUserId);
            }
        }

        init();

        function getAllUsers() {
            adminService
                .getAllDonors()
                .then(function (allUsers) {
                    model.allUsers = allUsers;
                }, function (err) {
                    console.log(err);
                });
        }

        function removeFromFavourites(projectId) {
            userService
                .removeFromFavourites(thisUserId, projectId)
                .then(function (response) {
                    getUserById(model.thisUserId);
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

        function unfollow(usernameToUnfollow) {
            adminService
                .unfollow(usernameToUnfollow, thisUserId)
                .then(function (response) {
                    console.log(response);
                    var followerIndex = model.thisUser.followers.map(function(x){
                        return x._id;})
                        .indexOf(model.thisUserId);
                    model.thisUser.followers.splice(followerIndex,1);
                    model.followed = false;
                    getUserById(model.thisUserId);
                }, function (err) {
                    console.log(err);
                })
        }




    }
})();