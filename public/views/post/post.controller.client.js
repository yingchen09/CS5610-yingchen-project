(function() {
    angular
        .module("WebAppMaker")
        .controller("PostListController", PostListController)
        .controller("NewPostController", NewPostController)
        .controller("PostEditController", PostEditController)
        .controller("PostController", PostController);

    function PostListController(currentUser, PostService) {
        var vm = this;
        vm.uid = currentUser._id;

        PostService
            .findPostsByUser(vm.uid)
            .then(renderPosts);
        function renderPosts(posts) {
            vm.posts = posts;
        }
    }

    function NewPostController($timeout, PostService, $location, currentUser) {
        var vm = this;
        vm.uid = currentUser._id;
        vm.createPost = createPost;

        function init() {
            PostService
                .findPostsByUser(vm.uid)
                .then(renderPosts);
            function renderPosts(posts) {
                vm.posts = posts;
            }
        }
        init();

        function createPost(postName, postDesc) {
            if (postName === undefined || postName === null) {
                vm.error = "Post name cannot be empty.";
                $timeout(function () {
                    vm.error = null;
                }, 3000);
                return;
            }
            var post = {
                name: postName,
                description: postDesc
            };
            return PostService
                .createPost(vm.uid, post)
                .then(function () {
                    $location.url("/posts");
                })
        }
    }

    function PostEditController($routeParams, $location, $timeout, PostService, currentUser) {
        var vm = this;
        vm.uid = currentUser._id;
        vm.pid = $routeParams.pid;

        vm.updatePost = updatePost;
        vm.deletePost = deletePost;

        // PostService
        //     .findPostsByUser(vm.uid)
        //     .then(function (posts) {
        //         vm.posts = posts;
        //     });

        function init() {
            PostService
                .findPostById(vm.pid)
                .then(function (post) {
                    vm.post = post;
                }, function (error) {
                    vm.error = "The post not found.";
                    $timeout(function () {
                        vm.error = null;
                    }, 3000);
                });
        }
        init();

        function updatePost(post) {
            PostService
                .updatePost(vm.pid, post)
                .then(function () {
                    $location.url("/posts/" + vm.pid);
                }, function () {
                    vm.updated = "Post updated.";
                    $timeout(function () {
                        vm.updated = null;
                    }, 3000);
                });
        }

        function deletePost(post) {
            PostService
                .deletePost(vm.uid, post._id)
                .then(function () {
                    $location.url("/posts");
                }, function (error) {
                    vm.error = "Unable to remove this post.";
                    $timeout(function () {
                        vm.error = null;
                    }, 3000);
                });
        }
    }

    function PostController(currentUser, $routeParams, PostService) {
        var vm = this;
        vm.uid = currentUser._id;
        vm.pid = $routeParams.pid;

        PostService
            .findPostById(vm.pid)
            .then(function (post) {
                vm.post = post;
                vm.username = currentUser.username;
                vm.date = post.dateCreated.substring(0, 10);
            }, function (error) {
                vm.error = "The post not found.";
                $timeout(function () {
                    vm.error = null;
                }, 3000);
            });
    }


})();