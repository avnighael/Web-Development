(function() {
    angular
        .module('Handouts')
        .service('donationService', donationService);

    function donationService($http) {

        this.sendDonation = sendDonation;
        this.getDonationHistory = getDonationHistory;
        this.getDonation = getDonation;

        function getDonation(projectId) {
            var url = "/api/project/"+projectId+"/getDonations";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getDonationHistory(userId) {
            var url = "/api/project/user/"+userId+"/getDonations";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function sendDonation(userId, projectId, donation) {
            var url = "/api/project/user/"+userId+"/project/"+projectId+"/donate";
            return $http.post(url, donation)
                .then(function (response) {
                    console.log(response);
                    return response.data;
                });
        }

    }
})();
