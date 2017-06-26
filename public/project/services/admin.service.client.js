(function() {
    angular
        .module('Handouts')
        .service('adminService', adminService);

    function adminService($http) {

        this.getAllDonors = getAllDonors;
        this.getAllUsers = getAllUsers;
        this.deleteUser = deleteUser;
        this.createUser = createUser;
        this.getUserById = getUserById;
        this.modifyUser = modifyUser;
        this.unfollow = unfollow;
        this.getDonationHistory = getDonationHistory;
        this.deleteDonation = deleteDonation;
        this.getComments = getComments;
        this.deleteComment = deleteComment;
        this.getOpportunitiesOfDonor = getOpportunitiesOfDonor;

        function getOpportunitiesOfDonor(donorId) {
            var url = "/api/project/admin/donor/"+donorId+"/getOpportunities";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteComment(commentId) {
            var url = "/api/project/admin/comment/"+commentId+"/delete";
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getComments(userId) {
            var url = "/api/project/admin/user/"+userId+"/getComments";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteDonation(donationId) {
            var url = "/api/project/admin/"+donationId+"/delete";
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getDonationHistory(thisUserId) {
            var url = "/api/project/admin/user/"+thisUserId+"/getDonations";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function unfollow(usernameToUnfollow, thisUserId) {
            var url = "/api/project/admin/user/"+thisUserId+"/unfollow/"+usernameToUnfollow;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }

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

        function getAllUsers() {
            var url = "/api/project/users";
            return $http.get(url)
                .then(function (response) {
                    console.log(response);
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
