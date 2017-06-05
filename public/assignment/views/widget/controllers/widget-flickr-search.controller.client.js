(function () {
    angular
        .module('WAM')
        .controller('flickrController', flickrController);

    function flickrController($routeParams,
                                  flickrService,
                                  $location) {
        var model = this;

        model.searchPhotos = searchPhotos;
        
        function searchPhotos(searchText) {
            console.log(searchText);
            flickrService
                .searchPhotos(searchText)
                .then(function(response) {
                    console.log(response.data);
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });

        }


    }
})();
