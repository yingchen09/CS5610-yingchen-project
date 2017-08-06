module.exports = function(mongoose) {
    var Schema = mongoose.Schema;

    var contactSchema = new Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: "userModel"},
        name: String,
        email: String,
        phone: String,
        message: String,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: 'contact'});

    return contactSchema;
};
