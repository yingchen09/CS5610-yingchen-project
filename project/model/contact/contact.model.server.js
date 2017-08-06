module.exports = function(mongoose, userModel) {
    var contactSchema = require('./contact.schema.server')(mongoose);
    var contactModel = mongoose.model('contactModel', contactSchema);

    var api = {
        'findContactsByUser': findContactsByUser,
        'createContact': createContact
    };
    return api;

    function createContact(userId, contact) {
        contact._user = userId;
        return contactModel
            .create(contact)
            .then(function (contact) {
                return userModel
                    .addContactForUser(userId, contact._id);
            });
    }

    function findContactsByUser(userId) {
        return contactModel
            .find({_user: userId})
            .populate('_user')
            .exec();
    }
};
