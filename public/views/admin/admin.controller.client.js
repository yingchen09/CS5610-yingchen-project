(function () {
    angular
        .module("WebAppMaker")
        .controller("AdminUsersController", AdminUsersController);

    function AdminUsersController(UserService) {
        var vm = this;

        function init() {
            UserService
                .findAllUsers
                .then(function (users) {
                    vm.users = users;
                });
        }
        init();

    }
})();