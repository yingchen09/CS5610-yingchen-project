module.exports = function(mongoose){
    //var websiteSchema = require("../website/website.schema.server.js")(mongoose);
    var Schema = mongoose.Schema;

    var userSchema = new Schema({
        username : {type : String, required : true, unique : true},
        password : {type : String, required : true},
        firstName : String,
        lastName : String,
        roles : [{type : String,
            default: 'USER',
            enum: ['USER', 'ADMIN']}],
        google: {
            id:    String,
            token: String
        },
        email : String,
        phone : String,
        posts : [{type: Schema.Types.ObjectId, ref: 'postModel'}],
        contacts : [{type: Schema.Types.ObjectId, ref: 'contactModel'}],
        follows : [{type: Schema.Types.ObjectId, ref: 'userModel'}],
        dateCreated : {
            type : Date,
            default: Date.now
        }
    }, {collection: 'user'});

    return userSchema;
};
