(function () {
    angular
        .module("WebAppMaker")
        .factory('PostService', PostService);

    function PostService($http) {

        var services = {
            'createPost': createPost,
            'findPostsByUser': findPostsByUser
            // 'findPostById': findPostById,
            // 'updatePost': updatePost,
            // 'deletePost': deletePost,
            // 'deletePostsByUser': deletePostsByUser
        };
        return services;

        function findPostsByUser(userId) {
            var url = "api/user/" + userId + "/post";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createPost(userId, post) {
            var url = "/api/user/" + userId + "/post";
            return $http.post(url, post)
                .then(function (response) {
                    return response.data;
                });
        }
    }

})();