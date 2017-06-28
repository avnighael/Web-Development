(function () {
    angular
        .module("Handouts")
        .controller("AdminAddFollowingController", AdminAddFollowingController);

    function AdminAddFollowingController(adminService, currentUser, userService, $location, $routeParams) {

        var model = this;

        model.currentUser = currentUser;
        var thisUserId = $routeParams.userId;
        model.thisUserId = thisUserId;

        model.follow = follow;
        model.unfollow = unfollow;
        model.logout = logout;


        function init() {
            getAllDonors();
            getUserById(thisUserId);
        }

        init();

        function logout(user){
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                })
        }

        function follow(userIdToFollow) {
            userService
                .follow(userIdToFollow, model.thisUserId)
                .then(function (followers) {
                    getUserById(thisUserId);
                    model.message="Follower Successfully added";
                    console.log(model.thisUser);
                    model.thisUser.followers.push(followers);
                    model.followed = true;
                })
        }

        function getAllDonors() {
            adminService
                .getAllDonors()
                .then(function (allDonors) {
                    model.allDonors = allDonors;
                }, function (err) {
                    console.log(err);
                });
        }


        function getUserById(thisUserId) {
            adminService
                .getUserById(thisUserId)
                .then(function (thisUser) {
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