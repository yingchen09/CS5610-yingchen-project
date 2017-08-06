module.exports = function(app, models) {
    var contactModel = models.contactModel;

    app.post("/api/user/:uid/contact", createContact);

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


};
