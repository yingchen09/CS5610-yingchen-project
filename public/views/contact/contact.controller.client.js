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

    function ContactListController() {
        var vm = this;
    }

    function ContactSuccessController(currentUser) {
        var vm = this;
        vm.currentUser = currentUser;
        vm.updated = "Message has been sent.";
    }
})();