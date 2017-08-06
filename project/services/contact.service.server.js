module.exports = function(app, models) {
    var contactModel = models.contactModel;

    app.post("/api/user/:uid/contact", createContact);
    app.get("/api/user/:uid/contact", findContactsByUser);

    function createContact(req, res) {
        var uid = req.params.uid;
        var contact = req.body;

        contactModel
            .createContact(uid, contact)
            .then(function (contact) {
                res.json(contact);
            }, function (error) {
                res.send(error);
            });
    }

    function findContactsByUser(req, res) {
        var uid = req.params.uid;
        contactModel
            .findContactsByUser(uid)
            .then(function (contacts) {
                res.json(contacts);
            });
    }


};
