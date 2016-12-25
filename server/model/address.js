var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema({
    name: { type : String , unique : true, required : true },
    country:String,
    city:String,
    street:String,
    building:String,
    block:String,
    info:[]
});

module.exports = mongoose.model('Address',addressSchema,'address');