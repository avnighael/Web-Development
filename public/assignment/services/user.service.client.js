(function(){
    angular
        .module('WAM')
        .factory('userService', userService);

    function userService($http) {

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            login: login,
            logout: logout,
            register: register,
            unregister: unregister,
            checkAdmin: checkAdmin,
            checkLoggedIn: checkLoggedIn,
            deleteUser: deleteUser,
            updateUser: updateUser,
            modifyUser: modifyUser
        };
        return api;

        function unregister(user) {
            console.log(user);
            var url = "/api/assignment/unregister";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function findAllUsers() {
            var url = "/api/assignment/users/";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function checkAdmin() {
            var url = "/api/assignment/checkAdmin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function register(user) {
            var url = "/api/assignment/register";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = "/api/assignment/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function checkLoggedIn() {
            var url = "/api/assignment/checkLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/assignment/login";
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
            var url = "/api/assignment/admin/user/"+userId;
            return $http.put(url, newUser)
                .then(function (response) {
                    return response.data;
                });
        }

        function modifyUser(userId, newUser) {
            var url = "/api/assignment/user/"+userId;
            return $http.put(url, newUser)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = "/api/assignment/user/"+userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            var url = "/api/assignment/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/assignment/user/?username="+username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = "/api/assignment/user/"+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = "/api/assignment/user/?username="+username+"&password="+password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }
    }
})();