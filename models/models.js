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

mongoose.model('User', userSchema);
