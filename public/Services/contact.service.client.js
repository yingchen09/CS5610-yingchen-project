(function () {
    angular
        .module("WebAppMaker")
        .factory('ContactService', ContactService);

    function ContactService($http) {

        var services = {
            'createContact': createContact,
            'findContactsByUser': findContactsByUser
        };
        return services;

        function createContact(userId, contact) {
            var url = "/api/user/" + userId + "/contact";
            return $http.post(url, contact)
                .then(function (response) {
                    return response.data;
                });
        }

        function findContactsByUser(userId) {
            var url = "/api/user/" + userId + "/contact";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }

})();
