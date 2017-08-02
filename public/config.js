(function(){
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider

            .when('/register', {
                templateUrl : "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when('/login', {
                templateUrl : "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when('/profile', {
                templateUrl : "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/', {
                templateUrl : "/views/home/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo : "/"
            });
    }

    function checkLoggedIn(UserService, $q, $location) {
        var deferred = $q.defer();
        UserService
            .loggedin()
            .then(function(user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }


})();