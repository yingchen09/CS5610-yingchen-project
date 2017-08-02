module.exports = function(mongoose, userModel) {
    var postSchema = require('./post.schema.server')(mongoose);
    var postModel = mongoose.model('postModel', postSchema);

    var api = {
        'findPostsByUser': findPostsByUser,
        'createPost': createPost
    };
    return api;

    function createPost(userId, post) {
        post._user = userId;
        return postModel
            .create(post)
            .then(function (post) {
                return userModel
                    .addPostForUser(userId, post._id);
            });
    }

    function findPostsByUser(userId) {
        return postModel
            .find({_user: userId})
            .populate('_user')
            .exec();
    }
};