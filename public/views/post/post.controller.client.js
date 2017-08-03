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

    function PostEditController() {

    }

    function PostController() {

    }


})();