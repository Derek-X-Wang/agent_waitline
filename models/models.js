var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    email: String,
    password: String, //hash created from password
    name: String,
    phone: String,
    description: String,
    available: Boolean,
    created_at: {type: Date, default: Date.now}
});

var postSchema = new mongoose.Schema({
    created_by: { type: Schema.ObjectId, ref: 'User' },
    created_at: {type: Date, default: Date.now},
    text: String
});

mongoose.model('Post', postSchema);
mongoose.model('User', userSchema);
