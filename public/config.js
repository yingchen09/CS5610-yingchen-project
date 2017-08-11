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
                templateUrl : "/views/post/post-list.view.client.html",
                controller: "PostListController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/:uid/posts', {
                templateUrl : "/views/post/post-list.view.client.html",
                controller: "PostListController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/posts/new', {
                templateUrl : "/views/post/post-new.view.client.html",
                controller: "NewPostController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/posts/:pid/edit', {
                templateUrl : "/views/post/post-edit.view.client.html",
                controller: "PostEditController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/posts/:pid/search', {
                templateUrl : "/views/post/book-search.view.client.html",
                controller: "BookSearchController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/posts/:pid', {
                templateUrl : "/views/post/post.view.client.html",
                controller: "PostController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/:uid/posts/:pid', {
                templateUrl : "/views/post/post.view.client.html",
                controller: "PostController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/:uid/posts/:pid', {
                templateUrl : "/views/post/post.view.client.html",
                controller: "PostController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/contacts', {
                templateUrl : "/views/contact/contact-list.view.client.html",
                controller: "ContactListController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            // .when('/contacts/new', {
            //     templateUrl : "/views/contact/contact.view.client.html",
            //     controller: "ContactController",
            //     controllerAs: "model",
            //     resolve: {
            //         currentUser: checkLoggedIn
            //     }
            // })
            .when('/user/:uid/contacts/new', {
                templateUrl : "/views/contact/contact.view.client.html",
                controller: "ContactController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/:uid/contacts/success', {
                templateUrl : "/views/contact/contact-success.view.client.html",
                controller: "ContactSuccessController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/follows', {
                templateUrl : "/views/follow/follow-list.view.client.html",
                controller: "FollowListController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/follows/search', {
                templateUrl : "/views/follow/follow-search.view.client.html",
                controller: "FollowSearchController",
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
            .when('/admin', {
                templateUrl : "/views/admin/admin.view.client.html",
                // controller: "HomeController",
                // controllerAs: "model"
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/user', {
                templateUrl : "/views/admin/admin-users.view.client.html",
                controller: "AdminUsersController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkAdmin
                }
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
                    $location.url('/');
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function checkAdmin(UserService, $q, $location) {
        var deferred = $q.defer();
        UserService
            .checkAdmin()
            .then(function(user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/');
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

})();