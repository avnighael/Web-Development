(function () {
    angular
        .module("Handouts")
        .controller("AdminUsersController", AdminUsersController);

    function AdminUsersController(adminService, currentUser, userService, $location, $routeParams) {

        var model = this;

        model.currentUser = currentUser;
        var thisUserId = $routeParams.userId;;
        model.thisUserId = thisUserId

        model.getAllUsers = getAllUsers;
        model.deleteUser = deleteUser;
        model.createUser = createUser;
        model.modifyUser = modifyUser;
        model.logout = logout;

        function init() {

            if(!model.thisUserId) {
                getAllUsers();
            } else {
                getUserById(model.thisUserId);
            }

        }

        init();

        function logout(user){
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                })
        }

        function modifyUser(userId, user) {
            if((user.username === null && user.password === null) ||
                (user.username === '' && user.password === '') ||
                (typeof user.username === 'undefined' && typeof user.password === 'undefined')) {
                model.error = 'username and password is required';
                return;
            }

            if(user.username === null || user.username === '' || typeof user.username === 'undefined') {
                model.error = 'username is required';
                return;
            }

            if(user.password === null || user.password === '' || typeof user.password === 'undefined') {
                model.error = 'password is required';
                return;
            }

            if(user.role === "ORGANIZATION") {
                if((user.organization === null && user.registrationNumber === null) ||
                    (user.organization === '' && user.registrationNumber === '') ||
                    (typeof user.organization === 'undefined' && typeof user.registrationNumber === 'undefined')) {
                    model.error = 'Organization name and its registration number is required';
                    return;
                }

                if(user.organization === null || user.organization === '' || typeof user.organization === 'undefined') {
                    model.error = 'Organization name is required';
                    return;
                }
            }

            adminService
                .modifyUser(userId, user)
                .then(function () {
                    model.message = "User updated Successfully!"
                }, function (err) {
                    model.error = "User updation unsuccessfull!"
                })
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

        function createUser(user) {
            if((user.username === null && user.password === null) ||
                (user.username === '' && user.password === '') ||
                (typeof user.username === 'undefined' && typeof user.password === 'undefined')) {
                model.error = 'username and password is required';
                return;
            }

            if(user.username === null || user.username === '' || typeof user.username === 'undefined') {
                model.error = 'username is required';
                return;
            }

            if(user.password === null || user.password === '' || typeof user.password === 'undefined') {
                model.error = 'password is required';
                return;
            }

            if(user.password !== user.cpassword || user.password === null || typeof user.password === 'undefined') {
                model.error = "Passwords doesn't match, Try Again";
                return;
            }

            if(user.role === "ORGANIZATION") {
                if((user.organization === null && user.registrationNumber === null) ||
                    (user.organization === '' && user.registrationNumber === '') ||
                    (typeof user.organization === 'undefined' && typeof user.registrationNumber === 'undefined')) {
                    model.error = 'Organization name and its registration number is required';
                    return;
                }

                if(user.organization === null || user.organization === '' || typeof user.organization === 'undefined') {
                    model.error = 'Organization name is required';
                    return;
                }
            }

            userService
                .findUserByUsername(user.username)
                .then(function (status) {
                    if(!status)
                        adminService
                            .createUser(user)
                            .then(function () {
                                $location.url("/users/all/manage");
                            });
                    else
                        model.error = "Sorry, this username is taken";
                });

        }

        function getAllUsers() {
            adminService
                .getAllUsers()
                .then(function (allUsers) {
                    model.allUsers = allUsers;
                }, function (err) {
                    console.log(err);
                });
        }

        function deleteUser(userId) {
            adminService
                .deleteUser(userId)
                .then(function () {
                    model.message = "User Successfully removed!";
                    getAllDonors();
                }, function () {
                    model.error = "Unregistration failed!"
                });
        }




    }
})();