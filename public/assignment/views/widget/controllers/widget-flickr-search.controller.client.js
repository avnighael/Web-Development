(function () {
    angular
        .module('WAM')
        .controller('flickrController', flickrController);

    function flickrController(widgetService,
                                  flickrService,
                                  $location,
                                  $routeParams) {
        var model = this;

        var widgetId = $routeParams.widgetId;
        model.widgetId = widgetId;
        var userId = $routeParams.userId;
        model.userId = userId;
        var websiteId = $routeParams.websiteId;
        model.websiteId = websiteId;
        var pageId = $routeParams.pageId;
        model.pageId = pageId;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;
        
        function selectPhoto(photo) {
            console.log(photo);
            //console.log(model.widgetId);
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var newWidget={};

            newWidget.url = url;
            newWidget.type = "IMAGE";
            newWidget.pageId = model.pageId;
            widgetService
                .updateWidget(widgetId, newWidget)
                .then(function(widget){
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" +widgetId);
                });
        }
        
        function searchPhotos(searchText) {
            //console.log(searchText);
            flickrService
                .searchPhotos(searchText)
                .then(function(response) {
                    //console.log(response.data);
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });

        }


    }
})();
