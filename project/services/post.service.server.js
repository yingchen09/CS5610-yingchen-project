module.exports = function(app, models) {
    var postModel = models.postModel;

    app.get('/api/user/:uid/post', findPostsByUser);
    app.post('/api/user/:uid/post', createPost);

    function createPost(req, res) {
        var uid = req.params.uid;
        var post = req.body;

        postModel
            .createPost(uid, post)
            .then(function (post) {
                res.json(post);
            }, function (error) {
                res.send(error);
            });
    }

    function findPostsByUser (req, res) {
        var uid = req.params.uid;
        postModel
            .findPostsByUser(uid)
            .then(function (posts) {
                res.json(posts);
            });
    }
};