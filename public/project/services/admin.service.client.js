(function() {
    angular
        .module('Handouts')
        .service('adminService', adminService);

    function adminService($http) {

        this.getAllDonors = getAllDonors;
        this.deleteUser = deleteUser;
        this.createUser = createUser;
        this.getUserById = getUserById;
        this.modifyUser = modifyUser;

        function modifyUser(userId, user) {
            var url = "/api/project/user/"+userId+"/edit";
            return $http.put(url, user)
                .then(function (response) {
                    console.log(response);
                    return response.data;
                });
        }

        function getUserById(userId) {
            var url = "/api/project/user/"+userId;
            return $http.get(url)
                .then(function (response) {
                    console.log(response);
                    return response.data;
                });
        }
        
        function createUser(user) {
            var url = "/api/project/admin/user/create";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = "/api/project/admin/user/"+userId+"/delete";
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getAllDonors() {
            var url = "/api/project/donors";
            return $http.get(url)
                .then(function (response) {
                    console.log(response);
                    return response.data;
                });
        }



    }
})();
