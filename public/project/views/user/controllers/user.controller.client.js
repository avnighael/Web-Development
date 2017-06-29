(function () {
    angular
        .module('Handouts') // Here, only reading the module
        .controller('userController',userController);

    function  userController(userService, currentUser, $routeParams, $location) {
        var model = this;

        model.userId = $routeParams.userId;
        model.currentUserId = currentUser._id;
        model.currentUser = currentUser;
        var following = model.currentUser.following;
        model.following = following;

        model.myProfile = false;

        model.follow = follow;
        model.unfollow = unfollow;
        model.logout = logout;

        if(model.currentUserId === model.userId) {
            model.myProfile = true;
        }

        console.log(model.currentUser.following);
        for(var f in following) {
            if (following[f]._id === model.userId) {
                model.followed = true;
            } else {
                model.followed = false;
            }
        }
        
        function init() {
            model.tab = 'Followers';
            findUserById(model.userId);

        }

        init();

        function logout(user){
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                })
        }

        function findUserById(userId) {
            userService
                .findUserById(userId)
                .then(function (user) {
                    model.user = user;

                }, function (err) {
                    $location.url("/login");
                });
        }

        function follow(user) {
            userService
                .follow(user._id, model.currentUserId)
                .then(function (followers) {
                    user.followers.push(followers);
                    model.followed = true;
                    findUserById(model.userId);
                })
        }

        function unfollow(userIdToUnfollow) {
            userService
                .unfollow(userIdToUnfollow, model.currentUserId)
                .then(function (response) {
                    var followerIndex = model.user.followers.map(function(x){
                        return x._id;})
                        .indexOf(userIdToUnfollow);
                    model.user.followers.splice(followerIndex,1);
                    model.followed = false;
                    findUserById(model.userId);
                })
        }


    }
}) ();
