(function () {
    angular
        .module("WebAppMaker")
        .controller("ContactController", ContactController)
        .controller("ContactSuccessController", ContactSuccessController)
        .controller("ContactListController", ContactListController);

    function ContactController(ContactService, $location, currentUser, $timeout) {
        var vm = this;
        vm.uid = currentUser._id;
        vm.createContact = createContact;

        function createContact(name, email, phone, message) {
            if (name === null || name === undefined || email === null || email === undefined || phone === null
                || phone === undefined || message === null || message === undefined) {
                vm.error = "Name, email, phone or message cannot be empty.";
                $timeout(function () {
                    vm.error = null;
                }, 3000);
                return;
            }
            var contact = {
                name: name,
                email: email,
                phone: phone,
                message: message
            };
            return ContactService
                .createContact(vm.uid, contact)
                .then(function () {
                    $location.url("/contacts/success");
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

    function ContactSuccessController(currentUser) {
        var vm = this;
        vm.currentUser = currentUser;
        vm.updated = "Message has been sent.";
    }
})();