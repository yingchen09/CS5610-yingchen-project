module.exports = function(mongoose){
    var userSchema = require('./user.schema.server.js')(mongoose);
    var userModel = mongoose.model('userModel', userSchema);

    var api = {
        'createUser' : createUser,
        'findAllUsers' : findAllUsers,
        'findUserById' : findUserById,
        'findUserByUsername' : findUserByUsername,
        'findUserByCredentials' : findUserByCredentials,
        'findUserByGoogleId': findUserByGoogleId,
        'updateUser' : updateUser,
        'removePostFromUser' : removePostFromUser,
        'addPostForUser' : addPostForUser,
        'addContactForUser' : addContactForUser,
        'deleteUser' : deleteUser,
        'findFollowsByUser' : findFollowsByUser,
        'addFollow' : addFollow,
        'removeFollow' : removeFollow
    };

    return api;

    // Function Definition Section

    function findFollowsByUser(userId) {
        return userModel
            .findOne({_id: userId})
            .populate('follows')
            .exec();
    }

    function addFollow(uid, userId) {
        return userModel
            .findOne({_id: uid})
            .then(function (user) {
                user.follows.push(userId);
                return user.save();
            });
    }

    function removeFollow(uid, userId) {
        userModel
            .findOne({_id: uid})
            .then(
                function(user){
                    var index = user.follows.indexOf(userId);
                    user.follows.splice(index, 1);
                    return user.save();
                });
    }


    function findUserByGoogleId(googleId) {
        return userModel
            .findOne({'google.id': googleId});
    }


    function createUser(user){
        if (user.roles) {
            user.roles = user.roles.split(',');
        } else {
            user.roles = ['USER'];
        }

        var newUser = {
            username : user.username,
            password : user.password
        };

        if(user.firstName){
            newUser.firstName = user.firstName;
        }
        if(user.lastName){
            newUser.lastName = user.lastName;
        }
        if(user.email){
            newUser.email = user.email;
        }
        if(user.phone){
            newUser.phone = user.phone;
        }

        return userModel.create(user);
    }

    function findAllUsers() {
        return userModel.find();
    }

    function findUserById(userId){
        return userModel.findById(userId);
    }

    function findUserByUsername(uname){
        return userModel.findOne({username : uname})
    }


    function findUserByCredentials(username, password){
        return userModel.findOne({
            username : username,
            password : password
        });
    }

    //update username and password is not allowed here.
    function updateUser(userId, user){
        delete user.username;
        delete user.password;
        if (typeof user.roles === 'string') {
            user.roles = user.roles.split(',');
        }
        return userModel.update({
            _id : userId
        }, {$set: user});
    }

    function removePostFromUser(userId, postId){
        // db.user.update({_id : ObjectId("583cf3287ac013080c4adee5")}, {$push : { "websites" : ObjectId("583cf43693b914082152cc3c")}})
        userModel
            .findById(userId)
            .then(
                function(user){
                    var index = user.posts.indexOf(postId);
                    user.posts.splice(index, 1);
                    return user.save();
                    // user.websites.pull(websiteId);
                    // user.save();
                },
                function(error){
                    console.log(error);
                }
            );
    }

    function addPostForUser(userId, postId) {
        //console.log("add website for user");
        return userModel
            .findOne({_id: userId})
            .then(function (user) {
                user.posts.push(postId);
                return user.save();
            });
    }

    function addContactForUser(userId, contactId) {
        return userModel
            .findOne({_id: userId})
            .then(function (user) {
                user.contacts.push(contactId);
                return user.save();
            });
    }

    function deleteUser(userId){
        return userModel.remove({
            _id : userId
        });
    }
};