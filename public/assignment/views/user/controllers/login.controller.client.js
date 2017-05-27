(function () {
    angular
        .module('WAM') // Here, only reading the module
        .controller('loginController',loginController);

    function  loginController($location, userService) {
        var model = this;

        //Event Handlers
        model.login = login;

        function login (username, password) {
            var found = userService.findUserByCredentials(username, password);


            if(found !== null)  {
                $location.url('/user/' + found._id)
                //model.message = "Welcome " + username;
                //console.log(message);
            } else {
                //console.log("not  found");
                model.message = "Sorry " + username + " not found, please try again";
            }
        }
    }
}) ();