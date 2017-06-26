(function() {
    angular
        .module('Handouts')
        .service('opportunityService', opportunityService);

    function opportunityService($http) {

        this.createOpportunity = createOpportunity;
        this.getOpportunityById = getOpportunityById;
        this.updateOpportunity = updateOpportunity;
        this.deleteOpportunity = deleteOpportunity;
        this.getAllOpportunities = getAllOpportunities;
        this.getAllOpportunitiesById = getAllOpportunitiesById;
        this.addVolunteer = addVolunteer;
        this.deleteVolunteer = deleteVolunteer;
        this.getOpportunitiesOfDonor = getOpportunitiesOfDonor;
        this.getOpportunitiesByProjectId = getOpportunitiesByProjectId;

        function getOpportunitiesByProjectId(projectId) {
            var url = "/api/project/"+projectId+"/getOpportunities";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getOpportunitiesOfDonor(donorId) {
            var url = "/api/project/donor/"+donorId+"/getOpportunities";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteVolunteer(volunteerId, opportunityId) {
            var url = "/api/project/opportunity/"+opportunityId+"/volunteer/"+volunteerId+"/delete";
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function addVolunteer(volunteer, opportunityId) {
            var url = "/api/project/opportunity/"+opportunityId+"/volunteer/";
            return $http.post(url, volunteer)
                .then(function (response) {
                    return response.data;
                });
        }

        function getAllOpportunitiesById(createdBy) {
            var url = "/api/project/allOpportunities/"+createdBy;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getAllOpportunities() {
            var url = "/api/project/allOpportunities/";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteOpportunity(opportunityId) {
            var url = "/api/project/opportunity/"+opportunityId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function updateOpportunity(opportunityId, opportunity) {
            var url = "/api/project/opportunity/"+opportunityId;
            return $http.put(url, opportunity)
                .then(function (response) {
                    return response.data;
                });
        }

        function getOpportunityById(opportunityId) {
            var url = "/api/project/opportunity/"+opportunityId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createOpportunity(opportunity, projectId) {
            var url = "/api/project/"+projectId+"/opportunity";
            return $http.post(url, opportunity)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();
