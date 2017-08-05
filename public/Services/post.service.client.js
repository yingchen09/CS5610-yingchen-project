(function () {
    angular
        .module("WebAppMaker")
        .factory('PostService', PostService);

    function PostService($http) {

        var services = {
            'createPost': createPost,
            'findPostsByUser': findPostsByUser,
            'findPostById': findPostById,
            'updatePost': updatePost,
            'deletePost': deletePost
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

        function findPostById(postId) {
            var url = "/api/post/" + postId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updatePost(postId, post) {
            var url = "/api/post/" + postId;
            return $http.put(url, post)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePost(userId, postId) {
            var url = "/api/user/" + userId + "/post/" + postId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }

})();