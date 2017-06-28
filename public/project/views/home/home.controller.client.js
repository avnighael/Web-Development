(function () {
    angular
        .module('Handouts')
        .controller('homeController', homeController);

    function  homeController(currentUser,
                             orgService,
                             $location,
                             userService,
                             $scope) {
        var model = this;

        if(currentUser) {
            model.currentUserId = currentUser._id;
            model.currentUser = currentUser;
        }

        // model.updateUser = updateUser;
        // model.modifyUser = modifyUser;
         model.logout = logout;

        function init() {
            $scope.isCollapsed = true;

            $scope.myInterval = 4000;
            $scope.slides = [
                {
                    image: 'http://www.globalgiving.org/pfil/21980/pict_original.jpg'
                },
                {
                    image: 'http://www.globalgiving.org/pfil/9220/ph_9220_32832.jpg'
                },
                {
                    image: 'http://www.globalgiving.org/pfil/25409/pict_original.jpg'
                }
            ];

        }

        init();


        function logout(user){
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                })
        }
        //
        //
        // function modifyUser(newUser) {
        //     if(newUser.username === null || newUser.username === '' || typeof newUser.username === 'undefined') {
        //         model.error = 'username is required';
        //         model.message = "";
        //         return;
        //     }
        //
        //     //model.emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        //
        //     userService
        //         .modifyUser(model.userId, newUser)
        //         .then(function (user) {
        //             if (user != null) {
        //
        //                 model.message = "User updated successfully"
        //                 model.error="";
        //             }
        //             else {
        //                 model.error = "Unable to update user";
        //             }
        //         }, function (err) {
        //             console.log(err);
        //             return err;
        //         });
        // }
        //
        //
        // function updateUser(newUser) {
        //     if(newUser.username === null || newUser.username === '' || typeof newUser.username === 'undefined') {
        //         model.error = 'username is required';
        //         model.message = "";
        //         return;
        //     }
        //
        //     //model.emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        //
        //     userService
        //         .updateUser(model.userId, newUser)
        //         .then(function (user) {
        //             if (user != null) {
        //
        //                 model.message = "User updated successfully"
        //                 model.error="";
        //             }
        //             else {
        //                 model.error = "Unable to update user";
        //             }
        //         });
        // }

    }
}) ();