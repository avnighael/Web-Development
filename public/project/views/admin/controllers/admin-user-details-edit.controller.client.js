(function () {
    angular
        .module("Handouts")
        .controller("AdminUsersDetailsController", AdminUsersDetailsController);

    function AdminUsersDetailsController(adminService,
                                         currentUser,
                                         userService,
                                         opportunityService,
                                         $location,
                                         $routeParams) {

        var model = this;

        model.currentUser = currentUser;
        var thisUserId = $routeParams.userId;;
        model.thisUserId = thisUserId;

        model.removeFromFavourites = removeFromFavourites;
        model.addToFavourites = addToFavourites;
        model.removeFromWishlist = removeFromWishlist;
        model.getAllUsers = getAllUsers;
        model.unfollow = unfollow;
        model.getDonationHistory = getDonationHistory;
        model.deleteDonation = deleteDonation;
        model.getComments = getComments;
        model.deleteComment = deleteComment;
        model.getOpportunitiesOfDonor = getOpportunitiesOfDonor;
        model.deleteVolunteer = deleteVolunteer;
        model.getOpportunitiesOfOrg = getOpportunitiesOfOrg;
        model.deleteOpportunity = deleteOpportunity;


        function init() {

            if(!model.thisUserId) {
                getAllUsers();
            } else {
                getUserById(model.thisUserId);
                getDonationHistory(model.thisUserId);
                getComments(model.thisUserId);
                getOpportunitiesOfDonor(model.thisUserId);
                getOpportunitiesOfOrg(model.thisUserId);
            }
        }

        init();

        function deleteOpportunity(opportunityId) {
            opportunityService
                .deleteOpportunity(opportunityId)
                .then(function (response) {
                    console.log(response);
                    getUserById(model.thisUserId);
                    getDonationHistory(model.thisUserId);
                    getComments(model.thisUserId);
                    getOpportunitiesOfDonor(model.thisUserId);
                    getOpportunitiesOfOrg(model.thisUserId);
                }, function () {
                    model.error = "Something went wrong. Opportunity deletion unsuccessfull!"
                });
        }

        function getOpportunitiesOfOrg(createdBy) {
            opportunityService
                .getAllOpportunitiesById(createdBy)
                .then(function (opportunities) {
                    model.Orgopportunities = opportunities;
                }, function () {
                    model.error = "Uh Oh! Something went wrong."
                });
        }

        function deleteVolunteer(volunteerId, opportunityId) {
            opportunityService
                .deleteVolunteer(volunteerId, opportunityId)
                .then(function (response) {
                    getUserById(model.thisUserId);
                    getDonationHistory(model.thisUserId);
                    getComments(model.thisUserId);
                    getOpportunitiesOfDonor(model.thisUserId);
                    getOpportunitiesOfOrg(model.thisUserId);
                }, function (err) {
                    console.log(err);
                })
        }

        function getOpportunitiesOfDonor(donorId) {
            adminService
                .getOpportunitiesOfDonor(donorId)
                .then(function (opportunities) {
                    model.opportunities = opportunities;
                })
        }

        function deleteComment(commentId) {
            adminService
                .deleteComment(commentId)
                .then(function (response) {
                    getUserById(model.thisUserId);
                    getDonationHistory(model.thisUserId);
                    getComments(model.thisUserId);
                    getOpportunitiesOfDonor(model.thisUserId);
                }, function (err) {
                    console.log(err);
                })
        }

        function getComments(userId) {
            adminService
                .getComments(userId)
                .then(function (comments) {
                    model.comments = comments;
                }, function (err) {
                    console.log(err);
                })
        }

        function deleteDonation(donationId) {
            adminService
                .deleteDonation(donationId)
                .then(function (response) {
                    getUserById(model.thisUserId);
                    getDonationHistory(model.thisUserId);
                    getComments(model.thisUserId);
                    getOpportunitiesOfDonor(model.thisUserId);
                    getOpportunitiesOfOrg(model.thisUserId);
                },function (err) {
                    console.log(err);
                })
        }

        function getDonationHistory(thisUserId) {
            adminService
                .getDonationHistory(thisUserId)
                .then(function (donations) {
                   model.donations = donations;
                }, function (err) {
                    console.log(err);
                })
        }

        function getAllUsers() {
            adminService
                .getAllDonors()
                .then(function (allUsers) {
                    model.allUsers = allUsers;
                }, function (err) {
                    console.log(err);
                });
        }

        function removeFromWishlist(projectId) {
                userService
                    .removeFromWishList(thisUserId, projectId)
                    .then(function (response) {
                        getUserById(model.thisUserId);
                        getDonationHistory(model.thisUserId);
                        getComments(model.thisUserId);
                        getOpportunitiesOfDonor(model.thisUserId);
                        getOpportunitiesOfOrg(model.thisUserId);
                    },function (err) {
                        model.unauthorized = "Please register/login to add this project to WishList";
                        console.log(err);
                    })

        }


        function removeFromFavourites(projectId) {
            userService
                .removeFromFavourites(thisUserId, projectId)
                .then(function (response) {
                    getUserById(model.thisUserId);
                    getDonationHistory(model.thisUserId);
                    getComments(model.thisUserId);
                    getOpportunitiesOfDonor(model.thisUserId);
                    getOpportunitiesOfOrg(model.thisUserId);
                    model.favourite = false;
                },function (err) {
                    model.unauthorized = "Please register/login to add this project to WishList";
                    console.log(err);
                })
        }

        function addToFavourites(projectId, project) {
            userService
                .addToFavourites(thisUserId, projectId, project)
                .then(function (response) {
                    // model.favourite = true;
                    // model.notFavourite = null;
                    // console.log(response);
                },function (err) {
                    console.log(err);
                })
        }


        function getUserById(thisUserId) {
            adminService
                .getUserById(thisUserId)
                .then(function (thisUser) {
                    // console.log(model.thisUserId);
                    model.thisUser = thisUser;
                }, function (err) {
                    console.log(err);
                })
        }

        function unfollow(userIdToUnfollow) {
            userService
                .findUserById(thisUserId)
                .then(function (thisUser) {
                    userService
                        .unfollow(userIdToUnfollow, model.thisUserId)
                        .then(function (response) {
                            var followerIndex = model.thisUser.followers.map(function(x){
                                return x._id;})
                                .indexOf(model.thisUserId);
                            model.thisUser.followers.splice(followerIndex,1);
                            model.followed = false;
                            getUserById(model.thisUserId);
                            getDonationHistory(model.thisUserId);
                            getComments(model.thisUserId);
                            getOpportunitiesOfDonor(model.thisUserId);
                            getOpportunitiesOfOrg(model.thisUserId);
                        })
                }, function (err) {
                    console.log(err);
                })
        }

        // function unfollow(userIdToUnfollow) {
        //     adminService
        //         .unfollow(userIdToUnfollow, thisUserId)
        //         .then(function (response) {
        //             console.log(response);
        //             var followerIndex = model.thisUser.followers.map(function(x){
        //                 return x._id;})
        //                 .indexOf(model.thisUserId);
        //             model.thisUser.followers.splice(followerIndex,1);
        //             model.followed = false;
        //             getUserById(model.thisUserId);
        //         }, function (err) {
        //             console.log(err);
        //         })
        // }




    }
})();