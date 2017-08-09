(function() {
    angular
        .module("WebAppMaker")
        .controller("PostListController", PostListController)
        .controller("NewPostController", NewPostController)
        .controller("PostEditController", PostEditController)
        .controller("BookSearchController", BookSearchController)
        .controller("PostController", PostController);

    function PostListController(currentUser, PostService, UserService, $location, $routeParams) {
        var vm = this;
        var userId = $routeParams.uid;//currentUser._id;

        if (userId) {
            vm.uid = userId;
            vm.userId = userId;
        } else {
            vm.uid = currentUser._id;
        }

        PostService
            .findPostsByUser(vm.uid)
            .then(renderPosts);
        function renderPosts(posts) {
            vm.posts = posts;
        }

        vm.logout = logout;
        function logout() {
            UserService
                .logout()
                .then(function() {
                    $location.url('/');
                })
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

        function createPost(postName, postDesc, postUrl, bookTitle, bookImgUrl) {
            if (postName === undefined || postName === null) {
                vm.error = "Post name cannot be empty.";
                $timeout(function () {
                    vm.error = null;
                }, 3000);
                return;
            }
            var post = {
                name: postName,
                description: postDesc,
                url: postUrl,
                bookTitle: bookTitle,
                bookImgUrl: bookImgUrl
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

    function PostController(currentUser, $routeParams, PostService, UserService, $location) {
        var vm = this;
        vm.currentUser = currentUser;
        var userId = $routeParams.uid;
        if (userId) {
            vm.uid = userId;
            vm.userId = userId;
        } else {
            vm.uid = currentUser._id;
        }
        vm.pid = $routeParams.pid;

        PostService
            .findPostById(vm.pid)
            .then(function (post) {
                vm.post = post;
                vm.username = post._user.username;
                console.log(post._user.username);
                vm.date = post.dateCreated.substring(0, 10);
            }, function (error) {
                vm.error = "The post not found.";
                $timeout(function () {
                    vm.error = null;
                }, 3000);
            });

        vm.logout = logout;
        function logout() {
            UserService
                .logout()
                .then(function() {
                    $location.url('/');
                })
        }
    }


    function BookSearchController(currentUser, $http, $routeParams, PostService, $location) {
        var vm = this;
        vm.uid = currentUser._id;
        vm.pid = $routeParams.pid;

        vm.searchBooks = searchBooks;
        vm.selectBook = selectBook;

        function searchBooks(searchText) {
            var url = "https://www.googleapis.com/books/v1/volumes?q=" + searchText;
            $http
                .get(url)
                .then(function (response) {
                    vm.books = response.data.items;
                });
        }


        function selectBook(book) {
            PostService
                .findPostById(vm.pid)
                .then(function (post) {
                    vm.post = post;
                    post.bookTitle = book.volumeInfo.title;
                    if (book.volumeInfo.imageLinks.smallThumbnail) {
                        post.bookImgUrl = book.volumeInfo.imageLinks.smallThumbnail;
                    }
                    PostService.updatePost(vm.pid, post);
                    $location.url("/posts/" + vm.pid);
                });
            // vm.bookTitle = book.volumeInfo.title;
            // vm.bookImgUrl = book.volumeInfo.imageLinks.smallThumbnail;
        }
    }

})();