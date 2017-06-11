(function () {
    angular
        .module('WAM', ['ngRoute', 'wbdvDirectives', 'textAngular']) //In angular if a function has one parameter then that is for get or read and if more than one then then it is interpreted as write/set operation
                            // Here second argument is doing nothing but is added because I want to create(i.e set) WAM module
                            // If Empty array means no dependencies
}) ();