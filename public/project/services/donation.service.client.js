(function() {
    angular
        .module('Handouts')
        .service('donationService', donationService);

    function donationService($http) {

        this.sendDonation = sendDonation;

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
