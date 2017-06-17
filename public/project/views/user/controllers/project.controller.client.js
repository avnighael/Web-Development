(function () {
    angular
        .module("Handouts")
        .controller("ProjectController", ProjectController);

    function ProjectController(userService, orgService, donationService, $location, $routeParams) {

        var model = this;

        var userId = $routeParams.userId;
        model.userId = userId;
        var organizationId = $routeParams.organizationId;
        model.organizationId = organizationId;
        var projectId = $routeParams.projectId;
        model.projectId = projectId;

        model.sendDonation = sendDonation;
        model.addToWishList = addToWishList;
        model.removeFromWishList = removeFromWishList;
        model.wishListShow = wishListShow;

        function init() {
            model.donating = false;
            model.showDonate = true;
            model.wishlist = true;

            wishListShow();

            orgService
                .getProjectDetailsById(projectId)
                .then(renderProject);
        }

        init();

        function renderProject(proj) {
            var proj = proj.data.project;
            model.proj = proj;
            console.log(proj);
        }

        function wishListShow() {
            userService
                .findUserWishListProjectById(userId, projectId)
                .then(function (status) {
                    if(status)
                        model.saved = true;
                    else
                        model.saved = false;
                })
        }

        function removeFromWishList(projectId) {
            userService
                .removeFromWishList(userId, projectId)
                .then(function (response) {
                    model.saved = false;
                },function (err) {
                    model.unauthorized = "Please register/login to add this project to WishList";
                    console.log(err);
                })
        }
        
        function addToWishList(projectId, project) {
            userService
                .addToWishList(userId, projectId, project)
                .then(function (response) {
                    model.saved = true;
                    model.unsaved = null;
                   // console.log(response);
                },function (err) {
                    console.log(err);
                })
        }

        function sendDonation(donation) {
            // var amnt = {"amount": amount};
            // console.log(amnt);
            donationService
                .sendDonation(userId, projectId, donation)
                .then(function (response) {
                    console.log(response);
                }, function (err) {
                    console.log(err);
                });
        }



    }
})();