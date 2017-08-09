(function () {
    angular
        .module("WebAppMaker")
        .controller("ContactController", ContactController)
        .controller("ContactSuccessController", ContactSuccessController)
        .controller("ContactListController", ContactListController);

    function ContactController(ContactService, $location, currentUser, $timeout, $routeParams) {
        var vm = this;
        vm.uid = $routeParams.uid;

        vm.name = currentUser.username;
        vm.createContact = createContact;

        function createContact(email, phone, message) {
            if (email === null || email === undefined || phone === null
                || phone === undefined || message === null || message === undefined) {
                vm.error = "Email, phone or message cannot be empty.";
                $timeout(function () {
                    vm.error = null;
                }, 3000);
                return;
            }
            var contact = {
                name: vm.name,
                email: email,
                phone: phone,
                message: message
            };
            return ContactService
                .createContact(vm.uid, contact)
                .then(function () {
                    $location.url("/user/"+vm.uid+ "/contacts/success");
                }, function () {
                    vm.updated = "Message has been sent.";
                    $timeout(function () {
                        vm.updated = null;
                    }, 3000);
                });
        }
    }

    function ContactListController(ContactService, currentUser, UserService, $location) {
        var vm = this;
        vm.uid = currentUser._id;
        //vm.userId = $routeParams.uid;

        ContactService
            .findContactsByUser(vm.uid)
            .then(renderContacts);
        function renderContacts(contacts) {
            vm.contacts = contacts;
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

    function ContactSuccessController(currentUser, $routeParams, UserService, $location) {
        var vm = this;
        vm.currentUser = currentUser;
        vm.uid = $routeParams.uid;
        vm.updated = "Message has been sent.";
        vm.logout = logout;
        function logout() {
            UserService
                .logout()
                .then(function() {
                    $location.url('/');
                })
        }
    }
})();