var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    account: { type : String , unique : true, required : true },
    password: String,
    email: String,
    phone: String,
    role:String,
    room:String,
    address: String,
    responsibility:String
});

module.exports = mongoose.model('User',userSchema);