(function(){
    angular
        .module('Handouts')
        .factory('userService', userService);

    function userService($http) {

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            deleteUser: deleteUser,
            updateUser: updateUser,
            addToWishList: addToWishList,
            removeFromWishList: removeFromWishList,
            findUserWishListProjectById: findUserWishListProjectById
        };
        return api;

        function updateUser(userId, newUser) {
            var url = "/api/project/user/"+userId;
            return $http.put(url, newUser)
                .then(function (response) {
                    return response.data;
                });

            // for (var u in users) {
            //     if (users[u]._id == userId) {
            //         users[u].firstName = newUser.firstName;
            //         users[u].lastName = newUser.lastName;
            //         return users[u];
            //     }
            // }
            // return null;
        }

        function deleteUser(userId) {
            var url = "/api/project/user/"+userId;
            return $http.delete(url)
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
    }
})();