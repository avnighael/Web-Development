(function () {
    angular
        .module('Handouts') // Here, only reading the module
        .controller('userController',userController);

    function  userController(userService, currentUser, $routeParams, $location) {
        var model = this;

        model.userId = $routeParams.userId;
        model.currentUserId = currentUser._id;
        model.currentUser = currentUser;
        var following = model.currentUser.following
        model.following = following;

        model.myProfile = false;

        model.follow = follow;
        model.unfollow = unfollow;

        if(model.currentUserId === model.userId) {
            model.myProfile = true;
        }

        for(var f in following) {
            if (following[f] === model.userId) {
                model.followed = true;
            }
        }
        
        function init() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    model.user = user;
                }, function (err) {
                    $location.url("/login");
                });
        }

        init();

        function follow(userIdToFollow) {
            userService
                .follow(userIdToFollow,model.currentUserId)
                .then(function (followers) {
                    model.user.followers.push(followers);
                    model.followed = true;
                })
        }
        function unfollow(userIdToUnfollow) {
            userService
                .unfollow(userIdToUnfollow,model.currentUserId)
                .then(function (response) {
                    var followerIndex = model.user.followers.map(function(x){
                        return x._id;})
                        .indexOf(model.currentUser._id);
                    model.user.followers.splice(followerIndex,1);
                    model.followed = false;
                })
        }


    }
}) ();