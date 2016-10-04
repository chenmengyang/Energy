var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var energySchema = new Schema({
    date: String,
    keyword: String,
    value: Number,
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
});

module.exports = mongoose.model('Energy',energySchema);