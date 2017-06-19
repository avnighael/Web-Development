(function(){
    angular
        .module('Handouts')
        .factory('userService', userService);

    function userService($http) {

        var api = {
            login: login,
            logout: logout,
            checkLoggedIn: checkLoggedIn,
            createUser: createUser,
            register: register,
            modifyUser: modifyUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            deleteUser: deleteUser,
            unregister: unregister,
            updateUser: updateUser,
            addToWishList: addToWishList,
            removeFromWishList: removeFromWishList,
            findUserWishListProjectById: findUserWishListProjectById,
            getWishlist: getWishlist,
            sendDonation: sendDonation
        };
        return api;


        function register(user) {
            var url = "/api/project/register";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function modifyUser(userId, newUser) {
            var url = "/api/project/user/"+userId;
            return $http.put(url, newUser)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = "/api/project/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkLoggedIn() {
            var url = "/api/project/checkLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/project/login";
            var credentials = {
                username: username,
                password: password
            };

            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, newUser) {
            var url = "/api/project/admin/user/"+userId;
            return $http.put(url, newUser)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = "/api/project/user/"+userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function unregister(user) {
            // console.log(user);
            var url = "/api/project/unregister";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            var url = "/api/project/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/project/user/?username="+username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = "/api/project/user/"+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = "/api/project/user/?username="+username+"&password="+password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserWishListProjectById(userId, projectId) {
            var url = "/api/project/user/"+userId+"/project/"+projectId;
            return $http.get(url)
                .then(function (response) {
                    // console.log(response);
                    return response.data;
                });
        }

        function getWishlist(userId) {
            var url = "/api/project/user/"+userId+"/wishlist";
            return $http.get(url)
                .then(function (response) {
                    console.log(response);
                    return response.data;
                });
        }

        function removeFromWishList(userId, projectId) {
            var url = "/api/project/user/"+userId+"/project/"+projectId;
            return $http.delete(url)
                .then(function (response) {
                    console.log(response);
                    return response.data;
                });
        }
        
        function addToWishList(userId, projectId, project) {
            var url = "/api/project/user/"+userId+"/project/"+projectId;
            return $http.put(url, project)
                .then(function (response) {
                    console.log(response);
                    return response.data;
                });
        }

        function sendDonation(userId, projectId, amount) {
            var url = "/api/project/user/"+userId+"/project/"+projectId+"/donate";
            return $http.post(url, amount)
                .then(function (response) {
                    console.log(response);
                    return response.data;
                });
        }
    }
})();