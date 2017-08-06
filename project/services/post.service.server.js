module.exports = function(app, models) {
    var postModel = models.postModel;

    app.get('/api/user/:uid/post', findPostsByUser);
    app.post('/api/user/:uid/post', createPost);
    app.get('/api/post/:pid', findPostById);
    app.put('/api/post/:pid', updatePost);
    app.delete('/api/user/:uid/post/:pid', deletePost);

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

    function updatePost(req, res) {
        var pid = req.params.pid;
        var post = req.body;
        postModel
            .updatePost(pid, post)
            .then(function (status) {
                res.send(status);
            });
    }

    function findPostById(req, res) {
        var pid = req.params.pid;
        postModel
            .findPostById(pid)
            .then(function (post) {
                res.json(post);
            }, function (error) {
                res.send(error);
            });
    }

    function deletePost(req, res) {
        var pid = req.params.pid;
        var uid = req.params.uid;
        postModel
            .deletePost(uid, pid)
            .then(function (status) {
                res.send(status);
            });
    }
};