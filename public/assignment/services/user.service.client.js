(function(){
    angular
        .module('WAM')
        .factory('userService', userService);

    function userService($http) {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@gmail.com"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob.m@yahoo.com" },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly.garcia@gmail.com"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose.jannunzi@yahoo.com" }
        ];

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            deleteUser: deleteUser,
            updateUser: updateUser
        };
        return api;

        function updateUser(userId, newUser) {
            var url = "/api/assignment/user/"+userId;
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