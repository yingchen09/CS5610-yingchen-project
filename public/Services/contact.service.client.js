(function () {
    angular
        .module("WebAppMaker")
        .factory('ContactService', ContactService);

    function ContactService($http) {

        var services = {
            'createContact': createContact
            // 'findPostsByUser': findPostsByUser,
            // 'findPostById': findPostById,
            // 'updatePost': updatePost,
            // 'deletePost': deletePost
        };
        return services;

        function createContact(userId, contact) {
            var url = "/api/user/" + userId + "/contact";
            return $http.post(url, contact)
                .then(function (response) {
                    return response.data;
                });
        }

    }

})();
