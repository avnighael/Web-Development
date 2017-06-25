(function() {
    angular
        .module('Handouts')
        .service('orgService', orgService);

    function orgService($http) {
        this.getOrganization = getOrganization;
        this.getOrganizationDetailsById = getOrganizationDetailsById;
        this.getProjectsByKeyWords = getProjectsByKeyWords;
        this.getProjectDetailsById = getProjectDetailsById;
        this.getProjectsByCountry = getProjectsByCountry;
        this.getProjectsByCauseId = getProjectsByCauseId;
        this.getCauseID = getCauseID;
        this.sendDonation = sendDonation;
        this.postComment = postComment;
        this.getCommentsByProjectId = getCommentsByProjectId;
        this.deleteComment = deleteComment;
        this.getProjectsByOrgId = getProjectsByOrgId;

        var key = "7905ffa8-4842-42f9-98c2-6fbd35d08cb9";

        function getProjectsByOrgId(orgId) {
            var urlBase = "https://api.globalgiving.org/api/public/projectservice/organizations/ORGId/projects?api_key=APIKEY";
            var url = urlBase
                .replace("ORGId", orgId)
                .replace("APIKEY", key);

            return $http.get(url)
                .then(function (response) {
                    return response;
                });
        }

        function deleteComment(commentId) {
            var url = "/api/project/comment/"+commentId+"/delete";
            return $http.delete(url)
                .then(function (response) {
                    // console.log(response);
                    return response.data;
                });
        }

        function getCommentsByProjectId(projectId) {
            var url = "/api/project/"+projectId+"/comments";
            return $http.get(url)
                .then(function (response) {
                     // console.log(response);
                    return response.data;
                });
        }
        
        function postComment(projectId, comment) {
            var url = "/api/project/"+projectId+"/comment";
            return $http.post(url, comment)
                .then(function (response) {
                    // console.log(response);
                    return response.data;
                });
        }

        function sendDonation(proj, amount) {
            var url = "/api/project/donate";
            return $http.post(url, proj)
                .then(function (response) {
                    console.log(response);
                    return response.data;
                });
        }

        function getOrganizationDetailsById(orgId) {
            var urlBase = "https://api.globalgiving.org/api/public/orgservice/organization/ORGID?api_key=APIKEY";
            var url = urlBase
                .replace("ORGID", orgId)
                .replace("APIKEY", key);

            return $http.get(url)
                .then(function (response) {
                    return response;
                });
        }

        function getOrganization() {
            var urlBase = "https://api.globalgiving.org/api/public/orgservice/all/organizations/active?api_key=APIKEY";
            var url = urlBase
                .replace("APIKEY", key);

            return $http.get(url)
                .then(function (response) {
                    return response;
                });
        }

        function getCauseID() {
            var urlBase = "https://api.globalgiving.org/api/public/projectservice/themes?api_key=APIKEY";
            var url = urlBase
                .replace("APIKEY", key);

            return $http.get(url)
                .then(function (response) {
                    return response;
                });

        }

        function getProjectsByCauseId(themeId) {

            var urlBase = "https://api.globalgiving.org/api/public/projectservice/themes/THEMEID/projects/active?api_key=APIKEY";
            var url = urlBase
                .replace("APIKEY", key)
                .replace("THEMEID", themeId);
            return $http.get(url)
                .then(function (response) {
                    return response;
                });

            // var urlBase = "https://api.globalgiving.org/api/public/projectservice/themes?api_key=APIKEY";
            // var url = urlBase
            //     .replace("APIKEY", key);
            // //.replace("CODE", countryCode);
            // return $http.get(url)
            //     .then(function (response) {
            //         return response;
            //     });

        }

        function getProjectsByCountry(countryCode) {
            var urlBase = "https://api.globalgiving.org/api/public/projectservice/countries/CODE/projects/active?api_key=APIKEY";
            var url = urlBase
                .replace("APIKEY", key)
                .replace("CODE", countryCode);
            return $http.get(url)
                .then(function (response) {
                    return response;
                });
        }

        function getProjectDetailsById(projectId) {
            var urlBase = "https://api.globalgiving.org/api/public/projectservice/projects/PID?api_key=APIKEY";
            var url = urlBase
                .replace("APIKEY", key)
                .replace("PID", projectId);
            return $http.get(url)
                .then(function (response) {
                    return response;
                });

        }

        function getProjectsByKeyWords(searchTerm) {
            //var token = authenticateAPI()
            var urlBase = "https://api.globalgiving.org/api/public/services/search/projects?api_key=APIKEY&q=TEXT";
            var url = urlBase
                .replace("APIKEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url)
                .then(function (response) {
                    return response;
                });
        }
    }
})();
