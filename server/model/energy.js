var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var energySchema = new Schema({
    period: String,
    type: String,
    value: Number,
    resident: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
});

energySchema.index({ period: 1, type: 1, resident:1}, { unique: true });

module.exports = mongoose.model('Energy',energySchema,'energy');