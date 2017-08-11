(function () {
    angular
        .module("WebAppMaker")
        .controller("AdminUsersController", AdminUsersController);

    function AdminUsersController(UserService) {
        var vm = this;

        function init() {
            findAllUsers();
        }
        init();

        function findAllUsers() {
            UserService
                .findAllUsers()
                .then(function (users) {
                    vm.users = users;
                });
        }

        vm.deleteUser = deleteUser;

        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .then(findAllUsers);
        }

        vm.createUser = createUser;
        function createUser(user) {
            UserService
                .createUser(user)
                .then(findAllUsers);
        }

        vm.selectUser = selectUser;

        function selectUser(user) {
            vm.user = angular.copy(user);
        }

        vm.updateUser = updateUser;
        function updateUser(user) {
            UserService
                .updateUser(user._id, user)
                .then(findAllUsers);
        }
    }
})();