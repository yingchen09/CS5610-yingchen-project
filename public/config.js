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
            .when('/posts', {
                templateUrl : "/views/post/post-list.view.client.html"
                // controller: "HomeController",
                // controllerAs: "model"
            })
            .when('/posts/new', {
                templateUrl : "/views/post/post-new.view.client.html"
                // controller: "HomeController",
                // controllerAs: "model"
            })
            .when('/posts/edit', {
                templateUrl : "/views/post/post-edit.view.client.html"
                // controller: "HomeController",
                // controllerAs: "model"
            })
            .when('/posts/:postId', {
                templateUrl : "/views/post/post.view.client.html"
                // controller: "HomeController",
                // controllerAs: "model"
            })
            .when('/contacts', {
                templateUrl : "/views/contact/contact-list.view.client.html"
                // controller: "HomeController",
                // controllerAs: "model"
            })
            .when('/contacts/new', {
                templateUrl : "/views/contact/contact.view.client.html"
                // controller: "HomeController",
                // controllerAs: "model"
            })
            .when('/follows', {
                templateUrl : "/views/follow/follow-list.view.client.html"
                // controller: "HomeController",
                // controllerAs: "model"
            })
            .when('/follows/search', {
                templateUrl : "/views/follow/follow-search.view.client.html"
                // controller: "HomeController",
                // controllerAs: "model"
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