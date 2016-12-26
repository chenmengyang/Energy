var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    account: { type : String , unique : true, required : true },
    password: String,
    email: String,
    phone: String,
    role:String,
    // room:String,
    // address: String,
    responsibility:[]
});

userSchema.index({account: 1}, {unique: true});

module.exports = mongoose.model('User',userSchema);