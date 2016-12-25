var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var energySchema = new Schema({
    period: String,
    type: String,
    value: Number,
    building: {type: mongoose.Schema.Types.ObjectId, ref:'Address'}
});

energySchema.index({ period: 1, type: 1, building:1}, { unique: true });

module.exports = mongoose.model('Energy',energySchema,'energy');