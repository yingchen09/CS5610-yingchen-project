module.exports = function(mongoose, userModel) {
    var postSchema = require('./post.schema.server')(mongoose);
    var postModel = mongoose.model('postModel', postSchema);

    var api = {
        'findPostsByUser': findPostsByUser,
        'createPost': createPost,
        'findPostById': findPostById,
        'updatePost': updatePost,
        'deletePost': deletePost
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

    function findPostById(postId) {
        return postModel.findOne({_id: postId});
    }

    function updatePost(postId, post) {
        return postModel
            .update({_id: postId},
                {
                    name: post.name,
                    description: post.description,
                    url: post.url
            });
    }

    function deletePost(userId, postId) {
        return postModel
            .remove({_id: postId})
            .then(function (status) {
                return userModel
                    .removePostFromUser(userId, postId);
            });
    }
};