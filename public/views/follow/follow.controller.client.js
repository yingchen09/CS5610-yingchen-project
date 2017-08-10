(function() {
    angular
        .module("WebAppMaker")
        .controller("FollowListController", FollowListController)
        .controller("FollowSearchController", FollowSearchController);

    function FollowListController(currentUser, UserService, $location) {
        var vm = this;
        vm.uid = currentUser._id;
        //vm.userId = $routeParams.uid;

        UserService
            .findFollowsByUser(vm.uid)
            .then(renderFollows);
        function renderFollows(follows) {
            vm.follows = follows;
        }

        vm.retrieveFollow = retrieveFollow;
        function retrieveFollow(follow) {
            console.log(follow);
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

    function FollowSearchController(UserService, currentUser, $timeout) {
        var vm = this;
        vm.currentUser = currentUser;
        vm.searchUser = searchUser;

        function searchUser(searchText) {
            UserService
                .findUserByUsername(searchText)
                .then(function (user) {
                    vm.username = user.username;
                    vm.uid = user._id;
                }, function () {
                    vm.error = "User not found.";
                    $timeout(function () {
                        vm.updated = null;
                    }, 3000)});
        }
    }


})();