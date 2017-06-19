(function () {
    angular
        .module("Handouts")
        .controller("ProjectController", ProjectController);

    function ProjectController(userService, orgService, donationService, currentUser, $routeParams) {

        var model = this;

        if(currentUser) {
            var userId = currentUser._id;
            model.userId = userId;
        }

        model.user = currentUser;
        var organizationId = $routeParams.organizationId;
        model.organizationId = organizationId;
        var projectId = $routeParams.projectId;
        model.projectId = projectId;

        model.sendDonation = sendDonation;
        model.addToWishList = addToWishList;
        model.removeFromWishList = removeFromWishList;
        model.wishListShow = wishListShow;
        model.findProjectInWishlist = findProjectInWishlist;

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
                .then(function (pId) {
                    // console.log(pId);
                    model.pId = pId;
                    if(pId)
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
            // if()
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
        
        function findProjectInWishlist(projectId) {
            userService
                .findProjectInWishlist(userId, projectId)
                .then(function (pId) {
                    model.pId = pId;
                }, function (err) {
                    return err;
                })
        }

        function sendDonation(donation) {
            // var amnt = {"amount": amount};
            // console.log(amnt);
            donationService
                .sendDonation(userId, projectId, donation)
                .then(function (response) {
                    model.message = "Thank you for donating to this project :)";
                    model.saved = false;
                    model.donating = false;

                    removeFromWishList(projectId);
                    // console.log(model.pId);
                    // if(model.pId && model.pId === projectId) {
                    //     removeFromWishList(projectId);
                    // }

                }, function (err) {
                    model.error = "Uh oh! Something went wrong";
                });
        }



    }
})();