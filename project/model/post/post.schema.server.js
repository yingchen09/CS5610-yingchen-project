module.exports = function(mongoose) {
    var Schema = mongoose.Schema;

    var postSchema = new Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: "userModel"},
        name: String,
        description: String,
        url: String,
        bookTitle: String,
        bookImgUrl: String,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: 'post'});

    return postSchema;
};