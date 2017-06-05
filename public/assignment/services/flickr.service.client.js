(function() {
    angular
        .module('WAM')
        .service('flickrService', flickrService);

    function flickrService($http) {
        this.searchPhotos = searchPhotos;

        var key = "7b7af54361f242f9b6f5c5ed0f0d5846";
        var secret = "541a1dd52f87478c";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();
