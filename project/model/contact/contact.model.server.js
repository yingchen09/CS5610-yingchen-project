module.exports = function(mongoose, userModel) {
    var contactSchema = require('./contact.schema.server')(mongoose);
    var contactModel = mongoose.model('contactModel', contactSchema);

    var api = {
        // 'findPostsByUser': findPostsByUser,
        'createContact': createContact
        // 'findPostById': findPostById,
        // 'updatePost': updatePost,
        // 'deletePost': deletePost
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
};
