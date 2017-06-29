(function () {
    angular
        .module("Handouts")
        .controller("ProjectController", ProjectController);

    function ProjectController(userService,
                               orgService,
                               donationService,
                               currentUser,
                               opportunityService,
                               $routeParams,
                               $location) {

        var model = this;

        if(currentUser) {
            var userId = currentUser._id;
            model.userId = userId;
            model.currentUser = currentUser;

        }

        var organizationId = $routeParams.organizationId;
        model.organizationId = organizationId;
        var projectId = $routeParams.projectId;
        model.projectId = projectId;

        if($routeParams.userId) {
            var thisUserId = $routeParams.userId;
            model.thisUserId = thisUserId;
            model.isAdmin = true;
        }


        if(model.currentUser) {
            var favourites = model.currentUser.favourites
            model.favourites = favourites;
        }

        model.sendDonation = sendDonation;
        model.addToWishList = addToWishList;
        model.removeFromWishList = removeFromWishList;
        model.wishListShow = wishListShow;
        model.findProjectInWishlist = findProjectInWishlist;
        model.postComment = postComment;
        model.getCommentsByProjectId = getCommentsByProjectId;
        model.deleteComment = deleteComment;
        model.findUserOfThisComment = findUserOfThisComment;
        model.addToFavourites = addToFavourites;
        model.removeFromFavourites = removeFromFavourites;
        model.getOpportunitiesByProjectId = getOpportunitiesByProjectId;
        model.getDonation = getDonation;
        model.logout = logout;

        function init() {
            model.donating = false;
            model.showDonate = true;
            model.wishlist = true;
            model.blankCommentError = false;
            model.wantVolunteers = true;

            wishListShow();

            getOpportunitiesByProjectId(projectId);

            getCommentsByProjectId(projectId);

            getDonation(projectId);

            orgService
                .getProjectDetailsById(projectId)
                .then(renderProject);

            for(var f in favourites) {
                if (favourites[f].projectId === model.projectId) {
                    model.favourite = true;
                }
            }

        }

        init();

        function logout(user){
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                })
        }

        function renderProject(proj) {
            var proj = proj.data.project;
            model.proj = proj;
             console.log(proj);
        }

        function getDonation(projectId) {
            donationService
                .getDonation(projectId)
                .then(function (donations) {
                    model.donations = donations;
                    console.log(model.donations);
                    model.funding = 0;
                    for(var d in donations) {

                        model.funding += parseInt(donations[d].amount);
                    }

                }, function (err) {
                    console.log(err);
                })
        }

        function getOpportunitiesByProjectId(projectId) {
            opportunityService
                .getOpportunitiesByProjectId(projectId)
                .then(function (opportunities) {
                    // console.log(opportunities);
                    model.opportunities = opportunities;
                }, function (err) {
                    // console.log(err);
                })
        }

        function removeFromFavourites(projectId) {
            userService
                .removeFromFavourites(userId, projectId)
                .then(function (response) {
                    model.favourite = false;
                },function (err) {
                    model.unauthorized = "Please register/login to add this project to WishList";
                    // console.log(err);
                })
        }

        function addToFavourites(projectId, project) {
            if(model.thisUserId != model.currentUser._id) {
                userService
                    .addToFavourites(thisUserId, projectId, project)
                    .then(function (response) {
                        model.favourite = true;
                        $location.url('/admin/user/'+model.thisUserId+'/details');
                    },function (err) {
                        console.log(err);
                    })
            } else {
                userService
                    .addToFavourites(thisUserId, projectId, project)
                    .then(function (response) {
                        model.favourite = true;
                    },function (err) {
                        console.log(err);
                    })
            }

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
            if(model.thisUserId != model.currentUser._id) {
                userService
                    .removeFromWishList(thisUserId, projectId)
                    .then(function (response) {
                        model.saved = false;
                        // $location.url('/admin/user/'+model.thisUserId+'/details');
                    },function (err) {
                        model.unauthorized = "Please register/login to add this project to WishList";
                        console.log(err);
                    })
            } else {
                userService
                    .removeFromWishList(userId, projectId)
                    .then(function (response) {
                        model.saved = false;
                    },function (err) {
                        model.unauthorized = "Please register/login to add this project to WishList";
                        console.log(err);
                    })
            }

        }
        
        function addToWishList(projectId, project) {
            if(model.thisUserId != model.currentUser._id) {
                userService
                    .addToWishList(thisUserId, projectId, project)
                    .then(function (response) {
                        model.saved = true;
                        model.unsaved = null;
                        $location.url('/admin/user/'+model.thisUserId+'/details');
                        // console.log(response);
                    },function (err) {
                        console.log(err);
                    })
            } else {
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
            if(typeof donation === 'undefined') {
                model.donationError = 'Donation amount is required';
                model.message = "";
                return;
            }

            donationService
                .sendDonation(userId, projectId, donation)
                .then(function (response) {
                    model.message = "Thank you for donating to this project :)";
                    model.saved = false;
                    model.donating = false;

                    removeFromWishList(projectId);
                    getDonation(projectId);

                }, function (err) {
                    model.error = "Uh oh! Something went wrong";
                });
        }

        function postComment(comment) {
            if(typeof comment === "undefined" || comment.text === ''){
                model.blankCommentError = "Please enter text to post comment";
            }
            else{
                model.blankCommentError = false;
                orgService
                    .postComment(projectId,comment)
                    .then(function (response) {
                        // var newComment = response.data;
                        // console.log(response)
                         model.comment = null;
                        getCommentsByProjectId(projectId);
                    },function (err) {
                        console.log(err);
                    })
            }
        }

        function getCommentsByProjectId(projectId) {
            orgService
                .getCommentsByProjectId(projectId)
                .then(function (comments) {
                    if(comments.length != 0) {
                        model.proj.comments = comments;
                    }
                      // console.log(model.proj.comments);
                    // console.log(comments)
                       // console.log(model.proj.comments);
                }, function (err) {
                    console.log(err);
                })
        }

        function deleteComment(commentId) {
            orgService
                .deleteComment(commentId)
                .then(function (status) {
                    // model.message = "Removed successfully";
                    getCommentsByProjectId(projectId);
                }, function (err) {
                    return err;
                })
        }

        function findUserOfThisComment(commentUserId) {
            // for(var c in comments)
             var user = userService.findUserById(commentUserId);
             // console.log(user);
             return user;
        }
    }
})();