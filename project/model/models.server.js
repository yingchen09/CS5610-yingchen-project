//export `heroku config -s`
module.exports = function() {
    var connectionString =  null;

    if (process.env.MONGODB_URI) {
        connectionString = 'mongodb://cs5610-webdev-yingchen-project:th22977cy@ds127443.mlab.com:27443/heroku_pz4jfjv2';
    }
    else
    {
        connectionString = 'mongodb://localhost/cs5610-project'
    }

    var mongoose = require('mongoose');
    mongoose.connect(connectionString, {useMongoClient:true});
    mongoose.Promise = require('q').Promise;

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        // we're connected!
    });

    var userModel = require("./user/user.model.server.js")(mongoose);
    var postModel = require("./post/post.model.server")(mongoose, userModel);
    var contactModel = require("./contact/contact.model.server")(mongoose, userModel);


    var models = {
        'userModel' : userModel,
        'postModel' : postModel,
        'contactModel' : contactModel
    };

    return models;
};
